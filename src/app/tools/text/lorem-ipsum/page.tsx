"use client"

import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { loremIpsum } from "@/tools/text"

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState(3)
  const [result, setResult] = useState("")

  const handleGenerate = () => {
    const res = loremIpsum(paragraphs)
    setResult(res.output || res.error || "")
  }

  return (
    <ToolPage
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and projects."
      icon="📝"
      category="text"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Number of paragraphs: {paragraphs}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">
            Generate
          </button>
          <button onClick={() => setResult("")} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">
            Clear
          </button>
        </div>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Generated text:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
              {result}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-all"
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
