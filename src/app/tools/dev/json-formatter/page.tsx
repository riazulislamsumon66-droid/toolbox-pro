"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { jsonFormat, jsonMinify, jsonValidate } from "@/tools/dev"

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [indent, setIndent] = useState(2)
  const [mode, setMode] = useState<"format" | "minify" | "validate">("format")

  const handleProcess = () => {
    let output = ""
    switch (mode) {
      case "format":
        output = jsonFormat(input, indent)
        break
      case "minify":
        output = jsonMinify(input)
        break
      case "validate":
        output = jsonValidate(input)
        break
    }
    setResult(output)
  }

  return (
    <ToolPage title="JSON Formatter" description="Format, minify, and validate JSON data." icon="{}" category="dev">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setMode("format")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "format" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Format</button>
          <button onClick={() => setMode("minify")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "minify" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Minify</button>
          <button onClick={() => setMode("validate")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "validate" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Validate</button>
        </div>

        {mode === "format" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Indent: {indent} spaces</label>
            <input type="range" min="2" max="8" value={indent} onChange={(e) => setIndent(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Enter JSON:</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "John", "age": 30}' className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono text-sm" rows={8} />
        </div>

        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">{mode === "validate" ? "Validate" : "Process"}</button>
          <button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button>
        </div>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Result:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">{result}</div>
            <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-all">📋 Copy</button>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
