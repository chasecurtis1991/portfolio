# Vercel Environment Variables Setup Guide

## Important: Next.js Configuration

This contact form requires API routes, which means your Next.js project cannot use `output: 'export'` for static HTML export. Make sure your `next.config.mjs` does NOT have `output: 'export'` set.

## Setting up Google Sheets API for Contact Form

### Required Environment Variables

1. **GOOGLE_CLIENT_EMAIL** - Your Google service account email
2. **GOOGLE_PRIVATE_KEY** - Your Google service account private key
3. **GOOGLE_SPREADSHEET_ID** (optional) - Your Google Sheets ID (defaults to the one in code)
4. **GOOGLE_SHEET_ID** (optional) - Your specific sheet ID within the spreadsheet (defaults to the one in code)

### How to Set Up in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable as follows:

#### GOOGLE_CLIENT_EMAIL
- **Key**: `GOOGLE_CLIENT_EMAIL`
- **Value**: Your service account email (e.g., `your-service-account@your-project.iam.gserviceaccount.com`)
- **Environment**: Production, Preview, Development

#### GOOGLE_PRIVATE_KEY
This is the tricky one! Follow these steps carefully:

**Option 1 (Recommended): Using Vercel's multi-line input**
1. Copy your entire private key from your JSON file, including the BEGIN and END lines
2. In Vercel's environment variable input:
   - **Key**: `GOOGLE_PRIVATE_KEY`
   - **Value**: Paste the key directly WITHOUT quotes
   - Make sure the value looks like this:
     ```
     -----BEGIN PRIVATE KEY-----
     MIIEvQIBADANBgkqhkiG9w0BAQ...
     [multiple lines of key data]
     ...XYZ
     -----END PRIVATE KEY-----
     ```
   - **Environment**: Production, Preview, Development

**Option 2: Using escaped newlines**
1. Copy your private key from your JSON file
2. Replace all actual newlines with `\n`
3. In Vercel's environment variable input:
   - **Key**: `GOOGLE_PRIVATE_KEY`
   - **Value**: Paste the single-line key (with `\n` instead of actual line breaks)
   - **Environment**: Production, Preview, Development

### Common Issues and Solutions

1. **"Invalid private key format - missing BEGIN/END markers"**
   - Make sure your key includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines
   - Check that you haven't accidentally wrapped the key in quotes

2. **Authentication errors**
   - Verify that the service account has been granted access to your Google Sheet
   - Share the Google Sheet with your service account email address

3. **Key formatting issues**
   - If copying from JSON, make sure to remove the surrounding quotes
   - The key should NOT start and end with `"`
   - If your key has `\n` in it, the code will handle converting them to actual newlines

### Testing Your Setup

1. After adding the environment variables, redeploy your project
2. Check the Vercel Function logs for any errors:
   - Go to Functions tab in Vercel dashboard
   - Click on `api/submit-form`
   - Check the logs when you submit the form

### Troubleshooting Commands

To verify your environment variables are set correctly, you can add temporary logging (remove in production):

```javascript
console.log('Email exists:', !!process.env.GOOGLE_CLIENT_EMAIL);
console.log('Private key exists:', !!process.env.GOOGLE_PRIVATE_KEY);
console.log('Private key starts with:', process.env.GOOGLE_PRIVATE_KEY?.substring(0, 30));
```

### Security Note

Never commit your private key to your repository. Always use environment variables for sensitive data. 