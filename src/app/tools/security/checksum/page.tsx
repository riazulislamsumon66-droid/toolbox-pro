"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { textChecksum } from "@/tools/dev"

export default function ChecksumPage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(textChecksum(text))
  return (
    <ToolPage title="Text Checksum" description="Calculate simple checksums for text." icon="✅" category="security">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter text:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to checksum..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={4} /></div>
        <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm">{result}</div>}
      </div>
    </ToolPage>
  )
}
