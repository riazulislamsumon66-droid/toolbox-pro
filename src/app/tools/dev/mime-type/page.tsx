"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { mimeType } from "@/tools/dev"

export default function MimeTypePage() {
  const [filename, setFilename] = useState("index.html")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(mimeType(filename))
  return (
    <ToolPage title="MIME Type Detector" description="Find MIME type by file extension." icon="📁" category="dev">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">File name or extension:</label><input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="index.html or .html" className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500" /></div>
        <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Detect</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm">MIME Type: <span className="text-green-400">{result}</span></div>}
      </div>
    </ToolPage>
  )
}
