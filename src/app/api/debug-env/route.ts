import { NextResponse } from 'next/server';

// THIS IS A TEMPORARY DEBUG ENDPOINT - REMOVE AFTER FIXING THE ISSUE
export async function GET() {
    const hasEmail = !!process.env.GOOGLE_CLIENT_EMAIL;
    const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY;
    const privateKeyPreview = process.env.GOOGLE_PRIVATE_KEY
        ? process.env.GOOGLE_PRIVATE_KEY.substring(0, 50) + '...'
        : 'NOT SET';
    
    const privateKeyInfo = process.env.GOOGLE_PRIVATE_KEY ? {
        length: process.env.GOOGLE_PRIVATE_KEY.length,
        hasBeginMarker: process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY'),
        hasEndMarker: process.env.GOOGLE_PRIVATE_KEY.includes('END PRIVATE KEY'),
        hasNewlines: process.env.GOOGLE_PRIVATE_KEY.includes('\n'),
        hasEscapedNewlines: process.env.GOOGLE_PRIVATE_KEY.includes('\\n'),
        startsWithQuote: process.env.GOOGLE_PRIVATE_KEY.startsWith('"'),
        endsWithQuote: process.env.GOOGLE_PRIVATE_KEY.endsWith('"'),
    } : null;

    return NextResponse.json({
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        hasGoogleClientEmail: hasEmail,
        googleClientEmail: hasEmail ? process.env.GOOGLE_CLIENT_EMAIL : 'NOT SET',
        hasGooglePrivateKey: hasPrivateKey,
        privateKeyPreview,
        privateKeyInfo,
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || 'USING DEFAULT',
        sheetId: process.env.GOOGLE_SHEET_ID || 'USING DEFAULT',
        timestamp: new Date().toISOString()
    });
} 