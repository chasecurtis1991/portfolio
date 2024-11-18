# Developer Portfolio

A modern, responsive single-page portfolio website built with Next.js 13+, React, and TypeScript. Features smooth scrolling navigation, a contact form integrated with Google Sheets, and a beautiful UI with interactive elements.

## Features

- **Modern UI/UX**: Sleek design with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Navigation**: Custom smooth scrolling between sections without URL changes
- **Contact Form Integration**: Form submissions stored in Google Sheets with email notifications
- **Interactive Elements**: Dynamic navigation indicator, hover effects, and animations
- **TypeScript Support**: Full TypeScript implementation for better development experience

## Tech Stack

- Next.js 13+
- React
- TypeScript
- Tailwind CSS
- Google Sheets API
- Google Apps Script (for email notifications)

## Prerequisites

Before you begin, ensure you have:

1. Node.js installed (Latest LTS version recommended)
2. A Google Cloud Platform account for Sheets API
3. Required environment variables:
   - GOOGLE_CLIENT_EMAIL
   - GOOGLE_PRIVATE_KEY

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google credentials:
```env
GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key
```

4. Start the development server:
```bash
npm run dev
```

## Google Sheets Integration

The contact form is integrated with Google Sheets:

1. Form data is submitted to a Google Sheet
2. Sheet tracks:
   - Timestamp
   - Email
   - Name
   - Phone
   - Message

## Project Structure

```
src/
├── app/                   # Next.js app directory
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── assets/                # Static assets
├── components/            # Reusable components
├── sections/              # Main page sections
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Projects.tsx
└── utils/                 # Utility functions
    └── scrollUtils.ts     # Smooth scrolling utility
```

## Deployment

The project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

## Development Notes

- The site uses custom smooth scrolling implementation
- Navigation indicator updates based on scroll position
- Form submissions include timestamp tracking
- Error handling implemented for form submissions
- Mobile-responsive design with tailored layouts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.
