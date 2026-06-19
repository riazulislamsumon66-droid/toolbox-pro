"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { diffCheck } from "@/tools/dev"

export default function DiffCheckerPage() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(diffCheck(text1, text2))
  return (
    <ToolPage title="Diff Checker" description="Compare two texts and see differences." icon="🔀" category="dev">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Text 1:</label><textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Original text..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={6} /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Text 2:</label><textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Modified text..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={6} /></div>
        </div>
        <div className="flex gap-3"><button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Compare</button><button onClick={() => { setText1(""); setText2(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl font-mono text-sm whitespace-pre-wrap">{result.split('\n').map((line, i) => (<div key={i} className={line.startsWith('- ') ? 'text-red-400' : line.startsWith('+ ') ? 'text-green-400' : 'text-gray-500'}>{line}</div>))}</div>}
      </div>
    </ToolPage>
  )
}
