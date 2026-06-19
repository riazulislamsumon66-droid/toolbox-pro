import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL('https://toolbox-pro.vercel.app'),
  title: {
    default: 'ToolBox Pro - 40+ Free Online Tools | No Signup Required',
    template: '%s | ToolBox Pro',
  },
  description: 'Free online tools for everyone. Word Counter, Password Generator, JSON Formatter, Color Picker, Gradient Generator, Regex Tester, Unit Converter, BMI Calculator, and 35+ more tools. No signup required, all run in your browser.',
  keywords: [
    'free tools', 'online tools', 'word counter', 'password generator', 'json formatter',
    'color picker', 'gradient generator', 'regex tester', 'unit converter', 'bmi calculator',
    'developer tools', 'text tools', 'design tools', 'security tools', 'calculator',
    'lorem ipsum generator', 'base64 encoder', 'url encoder', 'html encoder', 'hash generator',
    'uuid generator', 'qr code', 'image compressor', 'pdf tools', 'seo tools',
    'no signup', 'free forever', 'browser based tools', 'web utilities',
  ],
  authors: [{ name: 'ToolBox Pro', url: 'https://toolbox-pro.vercel.app' }],
  creator: 'ToolBox Pro',
  publisher: 'ToolBox Pro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolbox-pro.vercel.app',
    siteName: 'ToolBox Pro',
    title: 'ToolBox Pro - 40+ Free Online Tools | No Signup Required',
    description: 'Free online tools for text, design, development, security, and calculations. All run in your browser — no signup, no limits.',
    images: [
      {
        url: 'https://toolbox-pro.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolBox Pro - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolBox Pro - 40+ Free Online Tools',
    description: 'Free online tools for everyone. No signup required.',
    images: ['https://toolbox-pro.vercel.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://toolbox-pro.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#030712" />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body className="font-sans antialiased">
        <JsonLd />
        <Header />
        <main className="min-h-screen bg-gray-950 text-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
