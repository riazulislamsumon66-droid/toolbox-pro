"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { regexTest } from "@/tools/dev"

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("[a-zA-Z]+")
  const [flags, setFlags] = useState("g")
  const [text, setText] = useState("Hello World 123 Test")
  const [result, setResult] = useState("")

  const handleTest = () => {
    const res = regexTest(pattern, flags, text)
    setResult(res)
  }

  return (
    <ToolPage title="Regex Tester" description="Test regex patterns with match highlighting." icon="⚡" category="dev">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">Pattern:</label>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Flags:</label>
            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gim" className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Test text:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to test..." className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-purple-500 resize-none" rows={4} />
        </div>

        <div className="flex gap-3">
          <button onClick={handleTest} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Test Regex</button>
          <button onClick={() => setResult("")} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button>
        </div>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Results:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
