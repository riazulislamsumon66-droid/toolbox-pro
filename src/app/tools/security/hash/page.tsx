"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { hashGenerator } from "@/tools/security"

export default function HashGeneratorPage() {
  const [text, setText] = useState("")
  const [algorithm, setAlgorithm] = useState("SHA-256")
  const [result, setResult] = useState("")
  const handleHash = async () => {
    const hash = await hashGenerator(text, algorithm)
    setResult(hash)
  }
  return (
    <ToolPage title="Hash Generator" description="Generate SHA-256, SHA-1 hashes from text (client-side)." icon="🔒" category="security">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter text:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to hash..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={4} /></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Algorithm:</label><div className="flex gap-2">{["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map((a) => (<button key={a} onClick={() => setAlgorithm(a)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${algorithm === a ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>{a}</button>))}</div></div>
        <div className="flex gap-3"><button onClick={handleHash} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Generate Hash</button><button onClick={() => { setText(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm break-all">{result}</div>}
      </div>
    </ToolPage>
  )
}
