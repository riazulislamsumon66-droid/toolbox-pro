"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { uuidGenerator } from "@/tools/security"

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(5)
  const [result, setResult] = useState("")
  const handleGenerate = () => setResult(uuidGenerator(count))
  return (
    <ToolPage title="UUID Generator" description="Generate random UUIDs (v4) in bulk." icon="🎫" category="security">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Count: {count}</label><input type="range" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
        <div className="flex gap-3"><button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Generate</button><button onClick={() => setResult("")} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
