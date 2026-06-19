"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { textSorter } from "@/tools/text"

const modes = [
  { id: "alphabetical", label: "A → Z" },
  { id: "reverse", label: "Z → A" },
  { id: "length", label: "By Length" },
  { id: "random", label: "Random" },
  { id: "unique", label: "Remove Duplicates" },
]

export default function TextSorterPage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState("alphabetical")
  const [result, setResult] = useState("")

  const handleProcess = () => {
    const res = textSorter(input, mode)
    setResult(res.output || res.error || "")
  }

  return (
    <ToolPage title="Text Sorter" description="Sort text alphabetically, by length, random, or remove duplicates." icon="📋" category="text">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Enter your text (one item per line):</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"banana\napple\ncherry\ndate"} className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono text-sm" rows={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Sort mode:</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m.id ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{m.label}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Sort</button>
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
