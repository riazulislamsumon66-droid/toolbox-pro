"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { findReplace } from "@/tools/text"

export default function FindReplacePage() {
  const [text, setText] = useState("")
  const [find, setFind] = useState("")
  const [replace, setReplace] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(findReplace(text, find, replace, useRegex))
  return (
    <ToolPage title="Find & Replace" description="Find and replace text with regex support." icon="🔍" category="text">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Text:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={5} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Find:</label><input type="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find..." className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Replace with:</label><input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace..." className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" /></div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-purple-600" /><span className="text-sm text-gray-300">Use Regex</span></label>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Replace</button><button onClick={() => { setText(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
