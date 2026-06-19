"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { htmlEncode, htmlDecode } from "@/tools/security"

export default function HTMLEncoderPage() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(mode === "encode" ? htmlEncode(input) : htmlDecode(input))
  return (
    <ToolPage title="HTML Encoder/Decoder" description="Encode and decode HTML entities." icon="📄" category="security">
      <div className="space-y-6">
        <div className="flex gap-2"><button onClick={() => setMode("encode")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "encode" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Encode</button><button onClick={() => setMode("decode")} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "decode" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Decode</button></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">{mode === "encode" ? "HTML to encode:" : "Encoded HTML:"}</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "<div class='test'>Hello & World</div>" : "&lt;div class='test'&gt;Hello & World&lt;/div&gt;"} className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={5} /></div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">{mode === "encode" ? "Encode" : "Decode"}</button><button onClick={() => { setInput(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm break-all">{result}</div>}
      </div>
    </ToolPage>
  )
}
