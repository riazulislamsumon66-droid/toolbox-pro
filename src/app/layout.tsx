import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ToolBox Pro - Free Online Tools | Text, Design, Dev, AI Tools',
  description: '25+ free online tools: Word Counter, Password Generator, JSON Formatter, Color Picker, Gradient Generator, Regex Tester, Unit Converter, BMI Calculator, and more. No signup required.',
  keywords: ['free tools', 'online tools', 'word counter', 'password generator', 'json formatter', 'color picker', 'gradient generator', 'regex tester', 'unit converter', 'bmi calculator', 'developer tools', 'text tools', 'design tools'],
  authors: [{ name: 'ToolBox Pro' }],
  openGraph: {
    title: 'ToolBox Pro - Free Online Tools',
    description: '25+ free online tools. No signup required.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen bg-gray-950 text-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
