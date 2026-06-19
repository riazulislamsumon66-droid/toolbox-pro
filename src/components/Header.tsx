'use client'

import Link from 'next/link'
import { useState } from 'react'
import SearchModal from './SearchModal'

const categories = [
  { id: 'text', label: 'Text', icon: '📝', count: 10 },
  { id: 'security', label: 'Security', icon: '🔐', count: 10 },
  { id: 'design', label: 'Design', icon: '🎨', count: 8 },
  { id: 'dev', label: 'Developer', icon: '💻', count: 8 },
  { id: 'calculator', label: 'Calculator', icon: '🧮', count: 8 },
  { id: 'seo', label: 'SEO', icon: '🔍', count: 10 },
]

const allTools = [
  { name: 'Word Counter', description: 'Count words, characters, sentences, paragraphs and reading time', icon: '📊', href: '/tools/text/word-counter', category: 'text' },
  { name: 'Character Counter', description: 'Count letters, digits, spaces, special characters in text', icon: '🔤', href: '/tools/text/character-counter', category: 'text' },
  { name: 'Case Converter', description: 'Convert text to UPPER, lower, Title, Sentence, camelCase, snake_case', icon: '🔄', href: '/tools/text/case-converter', category: 'text' },
  { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs and projects', icon: '📝', href: '/tools/text/lorem-ipsum', category: 'text' },
  { name: 'Text Reverser', description: 'Reverse text by character, word, sentence, or line', icon: '🔃', href: '/tools/text/text-reverser', category: 'text' },
  { name: 'Text Sorter', description: 'Sort text alphabetically, by length, random, or remove duplicates', icon: '📋', href: '/tools/text/text-sorter', category: 'text' },
  { name: 'Text to Slug', description: 'Convert text to URL-friendly slug format', icon: '🔗', href: '/tools/text/text-to-slug', category: 'text' },
  { name: 'Find & Replace', description: 'Find and replace text with regex support', icon: '🔍', href: '/tools/text/find-replace', category: 'text' },
  { name: 'Text Statistics', description: 'Analyze word frequency, average word/sentence length', icon: '📈', href: '/tools/text/text-statistics', category: 'text' },
  { name: 'Remove Duplicates', description: 'Remove duplicate lines, words, or characters from text', icon: '✂️', href: '/tools/text/remove-duplicates', category: 'text' },
  { name: 'Password Generator', description: 'Generate secure random passwords with customizable options', icon: '🔐', href: '/tools/security/password-generator', category: 'security' },
  { name: 'UUID Generator', description: 'Generate random UUIDs (v4) in bulk', icon: '🎫', href: '/tools/security/uuid-generator', category: 'security' },
  { name: 'Base64 Encoder/Decoder', description: 'Encode and decode text to/from Base64', icon: '🔢', href: '/tools/security/base64', category: 'security' },
  { name: 'URL Encoder/Decoder', description: 'Encode and decode URLs safely', icon: '🌐', href: '/tools/security/url-encoder', category: 'security' },
  { name: 'HTML Encoder/Decoder', description: 'Encode and decode HTML entities', icon: '📄', href: '/tools/security/html-encoder', category: 'security' },
  { name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-512 hashes (client-side)', icon: '🔒', href: '/tools/security/hash', category: 'security' },
  { name: 'JSON Escape/Unescape', description: 'Escape and unescape JSON strings', icon: '{ }', href: '/tools/security/json-escape', category: 'security' },
  { name: 'Random Number Generator', description: 'Generate random numbers within a range', icon: '🎲', href: '/tools/security/random-number', category: 'security' },
  { name: 'Color Contrast Checker', description: 'Check WCAG color contrast ratio for accessibility', icon: '🎨', href: '/tools/security/contrast', category: 'security' },
  { name: 'Text Checksum', description: 'Calculate simple checksums for text', icon: '✅', href: '/tools/security/checksum', category: 'security' },
  { name: 'Color Picker', description: 'Pick colors and see HEX, RGB, HSL formats instantly', icon: '🎯', href: '/tools/design/color-picker', category: 'design' },
  { name: 'Gradient Generator', description: 'Create beautiful CSS gradients with preview', icon: '🌈', href: '/tools/design/gradient-generator', category: 'design' },
  { name: 'Color Palette Generator', description: 'Generate matching color shades from a base color', icon: '🎭', href: '/tools/design/palette-generator', category: 'design' },
  { name: 'CSS Shadow Generator', description: 'Create box-shadow and text-shadow with live preview', icon: '🕶️', href: '/tools/design/shadow-generator', category: 'design' },
  { name: 'Color Converter', description: 'Convert between HEX, RGB, and HSL color formats', icon: '🔄', href: '/tools/design/color-converter', category: 'design' },
  { name: 'Complementary Colors', description: 'Find complementary, triadic colors for any hex', icon: '🎪', href: '/tools/design/complementary', category: 'design' },
  { name: 'Random Color Generator', description: 'Generate random colors with hex codes', icon: '🎲', href: '/tools/design/random-color', category: 'design' },
  { name: 'Random Palette', description: 'Generate random beautiful color palettes', icon: '✨', href: '/tools/design/random-palette', category: 'design' },
  { name: 'JSON Formatter', description: 'Format, minify, and validate JSON with syntax highlighting', icon: '{ }', href: '/tools/dev/json-formatter', category: 'dev' },
  { name: 'JSON to CSV', description: 'Convert JSON arrays to CSV format', icon: '📊', href: '/tools/dev/json-to-csv', category: 'dev' },
  { name: 'CSV to JSON', description: 'Convert CSV data to JSON format', icon: '📋', href: '/tools/dev/csv-to-json', category: 'dev' },
  { name: 'Regex Tester', description: 'Test regex patterns with match highlighting', icon: '⚡', href: '/tools/dev/regex-tester', category: 'dev' },
  { name: 'HTML Formatter', description: 'Format and beautify HTML code', icon: '📄', href: '/tools/dev/html-formatter', category: 'dev' },
  { name: 'CSS Formatter', description: 'Format and beautify CSS/SCSS code', icon: '🎨', href: '/tools/dev/css-formatter', category: 'dev' },
  { name: 'Diff Checker', description: 'Compare two texts and see differences', icon: '🔀', href: '/tools/dev/diff-checker', category: 'dev' },
  { name: 'MIME Type Detector', description: 'Find MIME type by file extension', icon: '📁', href: '/tools/dev/mime-type', category: 'dev' },
  { name: 'BMI Calculator', description: 'Calculate your Body Mass Index and healthy weight range', icon: '⚖️', href: '/tools/calculator/bmi', category: 'calculator' },
  { name: 'Age Calculator', description: 'Calculate exact age in years, months, days from birthdate', icon: '🎂', href: '/tools/calculator/age', category: 'calculator' },
  { name: 'Tip Calculator', description: 'Calculate tip and split bills between people', icon: '💵', href: '/tools/calculator/tip', category: 'calculator' },
  { name: 'Unit Converter', description: 'Convert between length, weight, speed, data, area, volume', icon: '📏', href: '/tools/calculator/unit-converter', category: 'calculator' },
  { name: 'Discount Calculator', description: 'Calculate final price after discount percentage', icon: '🏷️', href: '/tools/calculator/discount', category: 'calculator' },
  { name: 'Loan Calculator', description: 'Calculate monthly payments, total interest for loans', icon: '🏦', href: '/tools/calculator/loan', category: 'calculator' },
  { name: 'Percentage Calculator', description: 'Calculate percentage of a number or between two numbers', icon: '💯', href: '/tools/calculator/percentage', category: 'calculator' },
  { name: 'Salary Calculator', description: 'Convert annual salary to hourly, daily, weekly, monthly', icon: '💰', href: '/tools/calculator/salary', category: 'calculator' },
  { name: 'Full SEO Audit', description: 'Complete SEO analysis — title, meta, headings, images, links, keywords, mobile, structured data', icon: '🔍', href: '/tools/seo/full-audit', category: 'seo' },
  { name: 'Title & Meta Checker', description: 'Check page title, meta description, canonical URL, viewport, and charset', icon: '📝', href: '/tools/seo/title-meta-checker', category: 'seo' },
  { name: 'Open Graph Analyzer', description: 'Analyze OG tags and Twitter Card markup for social sharing', icon: '🌐', href: '/tools/seo/open-graph-analyzer', category: 'seo' },
  { name: 'Heading Structure', description: 'Check H1-H6 heading hierarchy and structure for SEO', icon: '📋', href: '/tools/seo/heading-analyzer', category: 'seo' },
  { name: 'Image Alt Checker', description: 'Find missing alt text on images — important for SEO and accessibility', icon: '🖼️', href: '/tools/seo/image-alt-checker', category: 'seo' },
  { name: 'Link Analyzer', description: 'Analyze internal, external, nofollow links and anchor text', icon: '🔗', href: '/tools/seo/link-analyzer', category: 'seo' },
  { name: 'Keyword Density', description: 'Analyze keyword frequency and density in content', icon: '📊', href: '/tools/seo/keyword-density', category: 'seo' },
  { name: 'Mobile-Friendly Check', description: 'Check viewport, font sizes, fixed widths, and touch targets', icon: '📱', href: '/tools/seo/mobile-checker', category: 'seo' },
  { name: 'Structured Data', description: 'Check JSON-LD and microdata schema markup', icon: '{ }', href: '/tools/seo/structured-data-checker', category: 'seo' },
  { name: 'Performance Check', description: 'Check page size, image dimensions, scripts, and inline styles', icon: '⚡', href: '/tools/seo/performance-checker', category: 'seo' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
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

            {/* Right side: Search + Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-gray-500 bg-gray-900 rounded border border-gray-700">⌘K</kbd>
              </button>

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

      {/* Search Modal */}
      <SearchModal tools={allTools} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
