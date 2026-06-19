'use client'

import { useState } from 'react'
import ToolPage from '@/components/ToolPage'
import { wordCounter } from '@/tools/text'

export default function WordCounterPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleProcess = () => {
    const res = wordCounter(input)
    setResult(res.output || res.error || '')
  }

  return (
    <ToolPage
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and reading time in your text."
      icon="📊"
      category="text"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Enter your text:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none font-mono text-sm"
            rows={8}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">
            Count Words
          </button>
          <button onClick={() => { setInput(''); setResult('') }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">
            Clear
          </button>
        </div>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Results:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
