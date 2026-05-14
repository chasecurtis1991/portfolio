import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const formatPrivateKey = (key: string | undefined) => {
    if (!key) return '';

    let formattedKey = key;

    if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
        formattedKey = formattedKey.slice(1, -1);
    }

    if (!formattedKey.includes('\n') && formattedKey.includes('\\n')) {
        formattedKey = formattedKey.replace(/\\n/g, '\n');
    }

    if (!formattedKey.includes('BEGIN PRIVATE KEY') || !formattedKey.includes('END PRIVATE KEY')) {
        throw new Error('Invalid private key format - missing BEGIN/END markers');
    }

    return formattedKey;
};

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://chasecurtis.dev';

const corsHeaders = (origin: string | null) => ({
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
});

export async function OPTIONS(req: Request) {
    const origin = req.headers.get('origin');
    return NextResponse.json({}, { headers: corsHeaders(origin) });
}

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const FIELD_LIMITS = { name: 100, email: 254, phone: 20, message: 5000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeForSheets(value: string): string {
    // Strip leading formula trigger characters to prevent formula injection
    return value.replace(/^[=+\-@\t\r]+/, '').trim();
}

export async function POST(req: Request) {
    const origin = req.headers.get('origin');
    const headers = corsHeaders(origin);

    try {
        if (
            !process.env.GOOGLE_CLIENT_EMAIL ||
            !process.env.GOOGLE_PRIVATE_KEY ||
            !process.env.GOOGLE_SPREADSHEET_ID ||
            !process.env.GOOGLE_SHEET_ID
        ) {
            console.error('Missing required Google API credentials or spreadsheet configuration');
            return NextResponse.json(
                { error: 'Service temporarily unavailable' },
                { status: 503, headers }
            );
        }

        const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
        const SHEET_ID = parseInt(process.env.GOOGLE_SHEET_ID);

        const body = await req.json();
        const { email, name, phone, message } = body;

        if (!email || !name || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400, headers }
            );
        }

        if (
            typeof name !== 'string' || name.length > FIELD_LIMITS.name ||
            typeof email !== 'string' || email.length > FIELD_LIMITS.email ||
            typeof message !== 'string' || message.length > FIELD_LIMITS.message ||
            (phone != null && (typeof phone !== 'string' || phone.length > FIELD_LIMITS.phone))
        ) {
            return NextResponse.json(
                { error: 'Invalid input' },
                { status: 400, headers }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400, headers }
            );
        }

        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const sheet = response.data.sheets?.find(s => s.properties?.sheetId === SHEET_ID);
        if (!sheet || !sheet.properties?.title) {
            console.error('Sheet not found for SHEET_ID:', SHEET_ID);
            return NextResponse.json(
                { error: 'Failed to submit form. Please try again.' },
                { status: 500, headers }
            );
        }

        const SHEET_NAME = sheet.properties.title;

        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

        const row = [
            timestamp,
            sanitizeForSheets(email),
            sanitizeForSheets(name),
            phone ? sanitizeForSheets(String(phone)) : 'N/A',
            sanitizeForSheets(message),
        ];

        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:E`,
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: [row] },
            });
        } catch (appendError) {
            console.error('Append failed, trying direct update:', appendError);
            const existingData = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:E`,
            });

            const nextRow = (existingData.data.values?.length || 0) + 1;

            await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A${nextRow}:E${nextRow}`,
                valueInputOption: 'RAW',
                requestBody: { values: [row] },
            });
        }

        return NextResponse.json({ success: true }, { headers });
    } catch (error: any) {
        console.error('Error in submit-form API route:', error.message || error);
        return NextResponse.json(
            { error: 'Failed to submit form. Please try again.' },
            { status: 500, headers }
        );
    }
}
