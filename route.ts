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

// Set CORS headers helper function
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

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
    // Add logging for debugging
    console.log('POST request received to /api/submit-form');
    
    try {
        // Validate environment variables
        if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error('Missing Google API credentials');
            throw new Error('Missing required Google API credentials');
        }

        const body = await req.json();
        const { email, name, phone, message } = body;

        console.log('Received form data:', { email, name, hasPhone: !!phone, messageLength: message?.length });

        // Validate required fields
        if (!email || !name || !message) {
            console.error('Missing required fields');
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400, headers: corsHeaders }
            );
        }

        // First, get the sheet name
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        // Find the sheet with the specific gid
        const sheet = response.data.sheets?.find(s => s.properties?.sheetId === SHEET_ID);
        if (!sheet || !sheet.properties?.title) {
            console.error('Sheet not found');
            throw new Error('Sheet not found');
        }

        const SHEET_NAME = sheet.properties.title;
        console.log('Found sheet name:', SHEET_NAME);

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

        console.log('Successfully added row to sheet');
        return NextResponse.json({ success: true }, { headers: corsHeaders });
    } catch (error: any) {
        console.error('Error in submit-form API route:', error.message || error);
        
        // Return a more specific error message
        const errorMessage = error.message || 'Failed to submit form';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500, headers: corsHeaders }
        );
    }
}
