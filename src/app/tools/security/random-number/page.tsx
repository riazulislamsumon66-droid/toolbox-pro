"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { randomNumber } from "@/tools/security"

export default function RandomNumberPage() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)
  const [result, setResult] = useState("")
  const handleGenerate = () => setResult(randomNumber(min, max, count))
  return (
    <ToolPage title="Random Number Generator" description="Generate random numbers within a range." icon="🎲" category="security">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Min:</label><input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value) || 0)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Max:</label><input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value) || 0)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Count:</label><input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" /></div>
        </div>
        <div className="flex gap-3"><button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Generate</button><button onClick={() => setResult("")} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm">{result}</div>}
      </div>
    </ToolPage>
  )
}
