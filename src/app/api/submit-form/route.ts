import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Function to properly format the private key
const formatPrivateKey = (key: string | undefined) => {
    if (!key) return '';
    // Handle both \n and actual newlines
    const formattedKey = key
        .replace(/\\n/g, '\n')  // Replace string \n with actual newlines
        .replace(/\n/g, '\n')   // Normalize any actual newlines
        .replace(/""/g, '"');   // Fix any double quotes if present
    
    // Ensure the key has the proper format
    if (!formattedKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Invalid private key format');
    }
    
    return formattedKey;
};

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1XVGCGHKJV6deIRvOPmGWDUiOFOjfUYNDDd9QCmoWpYw';
const SHEET_ID = parseInt(process.env.GOOGLE_SHEET_ID || '851685740');

export async function POST(req: Request) {
    try {
        // Validate environment variables
        if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error('Missing required Google API credentials');
        }

        const body = await req.json();
        const { email, name, phone, message } = body;

        // Validate required fields
        if (!email || !name || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // First, get the sheet name
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        // Find the sheet with the specific gid
        const sheet = response.data.sheets?.find(s => s.properties?.sheetId === SHEET_ID);
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
    } catch (error: any) {
        console.error('Error:', error.message || error);
        
        // Return a more specific error message
        const errorMessage = error.message || 'Failed to submit form';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
