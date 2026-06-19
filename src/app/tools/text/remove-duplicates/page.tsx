"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { removeDuplicates } from "@/tools/text"

const modes = [{ id: "line", label: "Lines" }, { id: "word", label: "Words" }, { id: "char", label: "Characters" }]

export default function RemoveDuplicatesPage() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState("line")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(removeDuplicates(text, mode))
  return (
    <ToolPage title="Remove Duplicates" description="Remove duplicate lines, words, or characters from text." icon="✂️" category="text">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter text:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text with duplicates..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={6} /></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Mode:</label><div className="flex gap-2">{modes.map((m) => (<button key={m.id} onClick={() => setMode(m.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m.id ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>{m.label}</button>))}</div></div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Remove Duplicates</button><button onClick={() => { setText(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
