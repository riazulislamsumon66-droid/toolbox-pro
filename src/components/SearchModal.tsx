'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface Tool {
  name: string
  description: string
  icon: string
  href: string
  category: string
}

interface SearchModalProps {
  tools: Tool[]
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ tools, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const filtered = useCallback(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query, tools])

  if (!isOpen) return null

  const results = filtered()

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 50+ tools... (e.g., password, JSON, color, SEO)"
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-lg"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-500 bg-gray-800 rounded border border-gray-700">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-5 py-12 text-center">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-gray-400">No tools found for &quot;{query}&quot;</p>
              <p className="text-gray-600 text-sm mt-1">Try: password, JSON, color, SEO, calculator...</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              <div className="px-5 py-2 text-xs text-gray-500 uppercase tracking-wider">
                {results.length} tool{results.length !== 1 ? 's' : ''} found
              </div>
              {results.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-2xl shrink-0">{tool.icon}</span>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-200 truncate">{tool.name}</div>
                    <div className="text-sm text-gray-500 truncate">{tool.description}</div>
                  </div>
                  <span className="ml-auto text-xs text-gray-600 capitalize shrink-0">{tool.category}</span>
                </Link>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Quick Search</div>
              <div className="flex flex-wrap gap-2">
                {['password', 'JSON', 'color', 'SEO', 'calculator', 'hash', 'regex', 'gradient', 'BMI', 'encrypt'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-5 mb-3">Browse Categories</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'text', icon: '📝', label: 'Text Tools' },
                  { id: 'security', icon: '🔐', label: 'Security' },
                  { id: 'design', icon: '🎨', label: 'Design' },
                  { id: 'dev', icon: '💻', label: 'Developer' },
                  { id: 'calculator', icon: '🧮', label: 'Calculator' },
                  { id: 'seo', icon: '🔍', label: 'SEO Tools' },
                ].map(cat => (
                  <Link
                    key={cat.id}
                    href={`/tools/${cat.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm text-gray-400">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
