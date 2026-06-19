"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { checkOpenGraph } from "@/tools/seo"

function StatusIcon({ status }: { status: string }) {
  if (status === "pass") return <span className="text-green-400">✅</span>
  if (status === "warn") return <span className="text-yellow-400">⚠️</span>
  return <span className="text-red-400">❌</span>
}

export default function OpenGraphAnalyzerPage() {
  const [html, setHtml] = useState("")
  const [results, setResults] = useState<ReturnType<typeof checkOpenGraph> | null>(null)
  const handleAnalyze = () => setResults(checkOpenGraph(html))
  return (
    <ToolPage title="Open Graph Analyzer" description="Analyze OG tags and Twitter Card markup for social media sharing." icon="🌐" category="seo">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Paste HTML code:</label><textarea value={html} onChange={(e) => setHtml(e.target.value)} placeholder="Paste HTML source code..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={8} /></div>
        <div className="flex gap-3"><button onClick={handleAnalyze} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Analyze OG Tags</button><button onClick={() => { setHtml(""); setResults(null) }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {results && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border ${r.status === "pass" ? "bg-green-500/5 border-green-500/20" : r.status === "warn" ? "bg-yellow-500/5 border-yellow-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                <div className="flex items-start gap-3"><StatusIcon status={r.status} /><div><h4 className="font-medium text-gray-200">{r.name}</h4><p className="text-gray-400 text-sm mt-1">{r.message}</p></div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
