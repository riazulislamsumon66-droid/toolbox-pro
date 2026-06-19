"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { cssFormat } from "@/tools/dev"

export default function CssFormatterPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(cssFormat(input))
  return (
    <ToolPage title="CSS Formatter" description="Format and beautify CSS code." icon="🎨" category="dev">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter CSS:</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".container{display:flex;justify-content:center;}" className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={8} /></div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Format</button><button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">{result}</div>}
      </div>
    </ToolPage>
  )
}
