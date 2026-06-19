'use client'

import { useState } from 'react'

interface UrlInputProps {
  onFetch: (url: string) => void
  loading: boolean
  placeholder?: string
  buttonText?: string
}

export default function UrlInput({ onFetch, loading, placeholder = 'https://example.com', buttonText = '🔍 Analyze' }: UrlInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
    if (url.trim()) {
      onFetch(url.trim())
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">Website URL to analyze:</label>
      <div className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all whitespace-nowrap"
        >
          {loading ? '⏳ Fetching...' : buttonText}
        </button>
      </div>
    </div>
  )
}
