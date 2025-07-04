import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Function to properly format the private key
const formatPrivateKey = (key: string | undefined) => {
    if (!key) return '';
    
    let formattedKey = key;
    
    // Strip any surrounding quotes if present
    if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
        formattedKey = formattedKey.slice(1, -1);
    }
    
    // For Vercel environment variables, if the key already contains actual newlines,
    // we don't need to replace \n - this handles keys that were entered with line breaks in Vercel UI
    if (!formattedKey.includes('\n') && formattedKey.includes('\\n')) {
        // If the key has escaped newlines (\n) but no actual newlines, replace them
        formattedKey = formattedKey.replace(/\\n/g, '\n');
    }
    
    // Ensure the key has the proper format with BEGIN and END markers
    if (!formattedKey.includes('BEGIN PRIVATE KEY') || !formattedKey.includes('END PRIVATE KEY')) {
        throw new Error('Invalid private key format - missing BEGIN/END markers');
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

        // First, get the sheet name and find existing data
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



        // Format timestamp in MM/DD/YYYY hh:mm:ss format as plain text
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Create timestamp as a string to prevent Google Sheets auto-conversion
        const timestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

        // Prepare the row data
        const row = [
            timestamp,
            email,
            name,
            phone || 'N/A',
            message
        ];

        // Try to add to the table - first check if there's a table and extend it
        try {
            // Use append with insertDataOption to ensure it goes into the table
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:E`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS', // This ensures new rows are inserted properly
                requestBody: {
                    values: [row]
                },
            });
        } catch (appendError) {
            console.log('Append failed, trying direct update:', appendError);
            // Fallback: Get the data range and append manually
            const existingData = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:E`,
            });
            
            const nextRow = (existingData.data.values?.length || 0) + 1;
            console.log('Using fallback method, inserting at row:', nextRow);
            
            await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A${nextRow}:E${nextRow}`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [row]
                },
            });
        }

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
