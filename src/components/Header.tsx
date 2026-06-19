'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = [
  { id: 'text', label: 'Text', icon: '📝', count: 10 },
  { id: 'security', label: 'Security', icon: '🔐', count: 10 },
  { id: 'design', label: 'Design', icon: '🎨', count: 8 },
  { id: 'dev', label: 'Developer', icon: '💻', count: 8 },
  { id: 'calculator', label: 'Calculator', icon: '🧮', count: 8 },
  { id: 'seo', label: 'SEO', icon: '🔍', count: 10 },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧰</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ToolBox Pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/tools/${cat.id}`}
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-all flex items-center gap-1.5"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/tools/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="ml-auto text-xs text-gray-600">{cat.count}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
