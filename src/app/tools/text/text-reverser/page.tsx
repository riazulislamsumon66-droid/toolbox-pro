"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { textReverser } from "@/tools/text"

const modes = [
  { id: "full", label: "Full Reverse" },
  { id: "word", label: "Word by Word" },
  { id: "sentence", label: "Sentence by Sentence" },
  { id: "line", label: "Line by Line" },
]

export default function TextReverserPage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState("full")
  const [result, setResult] = useState("")

  const handleProcess = () => {
    const res = textReverser(input, mode)
    setResult(res.output || res.error || "")
  }

  return (
    <ToolPage title="Text Reverser" description="Reverse text by character, word, sentence, or line." icon="🔃" category="text">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Enter your text:</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono text-sm" rows={5} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Mode:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m.id ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{m.label}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Reverse</button>
          <button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button>
        </div>
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Result:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>
            <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-all">📋 Copy</button>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
