"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { textToSlug } from "@/tools/text"

export default function TextToSlugPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(textToSlug(input))
  return (
    <ToolPage title="Text to Slug" description="Convert text to URL-friendly slug format." icon="🔗" category="text">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter text:</label><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter title or text..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500" /></div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Convert</button><button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm">{result}</div>}
      </div>
    </ToolPage>
  )
}
