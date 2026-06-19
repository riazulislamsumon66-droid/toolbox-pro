"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { jsonEscape, jsonUnescape } from "@/tools/security"

export default function JsonEscapePage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"escape" | "unescape">("escape")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(mode === "escape" ? jsonEscape(input) : jsonUnescape(input))
  return (
    <ToolPage title="JSON Escape/Unescape" description="Escape and unescape JSON strings." icon="{ }" category="security">
      <div className="space-y-6">
        <div className="flex gap-2"><button onClick={() => setMode("escape")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "escape" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Escape</button><button onClick={() => setMode("unescape")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "unescape" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Unescape</button></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">{mode === "escape" ? "JSON string:" : "Escaped string:"}</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "escape" ? 'Hello "World"\nNew line' : 'Hello \"World\"\\nNew line'} className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={5} /></div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">{mode === "escape" ? "Escape" : "Unescape"}</button><button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm break-all">{result}</div>}
      </div>
    </ToolPage>
  )
}
