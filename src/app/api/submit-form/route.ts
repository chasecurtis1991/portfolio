import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1XVGCGHKJV6deIRvOPmGWDUiOFOjfUYNDDd9QCmoWpYw';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, phone, message } = body;

        // First, get the sheet name
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        // Find the sheet with the specific gid
        const sheet = response.data.sheets?.find(s => s.properties?.sheetId === 851685740);
        if (!sheet || !sheet.properties?.title) {
            throw new Error('Sheet not found');
        }

        const SHEET_NAME = sheet.properties.title;

        // Format timestamp
        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Prepare the row data
        const row = [
            timestamp,
            email,
            name,
            phone || 'N/A',
            message
        ];

        // Append the row to the sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:E`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row]
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit form' },
            { status: 500 }
        );
    }
}
