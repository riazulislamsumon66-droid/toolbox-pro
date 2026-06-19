"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { textStatistics } from "@/tools/text"

export default function TextStatisticsPage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const handleAnalyze = () => setResult(textStatistics(text))
  return (
    <ToolPage title="Text Statistics" description="Analyze word frequency, average word/sentence length." icon="📈" category="text">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Enter your text:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text for analysis..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={8} /></div>
        <div className="flex gap-3"><button onClick={handleAnalyze} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Analyze</button><button onClick={() => { setText(""); setResult("") }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
