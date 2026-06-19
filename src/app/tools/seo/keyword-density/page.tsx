"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { checkKeywordDensity } from "@/tools/seo"

function StatusIcon({ status }: { status: string }) {
  if (status === "pass") return <span className="text-green-400">\u2705</span>
  if (status === "warn") return <span className="text-yellow-400">\u26a0\ufe0f</span>
  return <span className="text-red-400">\u274c</span>
}

export default function KeywordDensityPage() {
  const [html, setHtml] = useState("")
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState<ReturnType<typeof checkKeywordDensity> | null>(null)
  const handleAnalyze = () => setResults(checkKeywordDensity(html, keyword || undefined))
  return (
    <ToolPage title="Keyword Density Analyzer" description="Analyze keyword frequency and density in page content." icon="\ud83d\udcca" category="seo">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Paste HTML code:</label><textarea value={html} onChange={(e) => setHtml(e.target.value)} placeholder="Paste HTML source code..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={8} /></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Target keyword (optional):</label><input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g., free online tools" className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500" /></div>
        <div className="flex gap-3"><button onClick={handleAnalyze} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Analyze Keywords</button><button onClick={() => { setHtml(""); setResults(null) }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
        {results && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border ${r.status === "pass" ? "bg-green-500/5 border-green-500/20" : r.status === "warn" ? "bg-yellow-500/5 border-yellow-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                <div className="flex items-start gap-3"><StatusIcon status={r.status} /><div><h4 className="font-medium text-gray-200">{r.name}</h4><p className="text-gray-400 text-sm mt-1">{r.message}</p>{r.value && <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{r.value}</pre>}</div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
