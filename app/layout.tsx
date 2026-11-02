import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DISKAI – The Operating System for the Entertainment Industry',
  description: 'DISKAI brings touring, career management, events, opportunities and revenue insights into one intelligent platform for entertainment professionals.',
  generator: 'v0.app',
  metadataBase: new URL('https://diskai.vercel.app'),
  openGraph: {
    title: 'DISKAI – The Operating System for the Entertainment Industry',
    description: 'Join the DISKAI private beta and help shape the future of entertainment.',
    url: 'https://diskai.vercel.app',
    siteName: 'DISKAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DISKAI – The Operating System for the Entertainment Industry',
    description: 'Join the DISKAI private beta and help shape the future of entertainment.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
