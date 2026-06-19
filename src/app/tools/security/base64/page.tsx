"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { base64Encode, base64Decode } from "@/tools/security"

export default function Base64Page() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [result, setResult] = useState("")

  const handleProcess = () => {
    const output = mode === "encode" ? base64Encode(input) : base64Decode(input)
    setResult(output)
  }

  return (
    <ToolPage title="Base64 Encoder/Decoder" description="Encode and decode text to/from Base64 format." icon="🔢" category="security">
      <div className="space-y-6">
        <div className="flex gap-2">
          <button onClick={() => setMode("encode")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "encode" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Encode</button>
          <button onClick={() => setMode("decode")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "decode" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Decode</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{mode === "encode" ? "Text to encode:" : "Base64 to decode:"}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text..." : "Enter base64..."} className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono text-sm" rows={5} />
        </div>
        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">{mode === "encode" ? "Encode" : "Decode"}</button>
          <button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button>
        </div>
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Result:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap break-all">{result}</div>
            <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-all">📋 Copy</button>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
