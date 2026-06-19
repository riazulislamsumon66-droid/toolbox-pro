"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { checkOpenGraph } from "@/tools/seo"
import UrlInput from "@/components/UrlInput"
import { useFetchUrl } from "@/hooks/useFetchUrl"

function StatusIcon({ status }: { status: string }) {
  if (status === "pass") return <span className="text-green-400">✅</span>
  if (status === "warn") return <span className="text-yellow-400">⚠️</span>
  return <span className="text-red-400">❌</span>
}


export default function OpenGraphAnalyzerPage() {
  const [html, setHtml] = useState("")
  const [results, setResults] = useState<ReturnType<typeof checkOpenGraph> | null>(null)
  const [activeTab, setActiveTab] = useState<"url" | "paste">("url")
  const { fetchUrl, loading, error, progress } = useFetchUrl()

  const handleFetchAnalyze = async (url: string) => {
    const data = await fetchUrl(url)
    if (data) {
      setHtml(data.html)
      setResults(checkOpenGraph(data.html))
    }
  }

  const handlePasteAnalyze = () => {
    if (!html.trim()) return
    setResults(checkOpenGraph(html))
  }

  return (
    <ToolPage title="Open Graph Analyzer" description="Analyze OG tags and Twitter Card markup for social media sharing." icon="🌐" category="seo">
      <div className="space-y-6">
        <div className="flex gap-2">
          <button onClick={() => setActiveTab("url")} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "url" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>🌐 Enter URL</button>
          <button onClick={() => setActiveTab("paste")} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "paste" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>📋 Paste HTML</button>
        </div>

        {activeTab === "url" ? (
          <UrlInput onFetch={handleFetchAnalyze} loading={loading} buttonText="🌐 Analyze OG Tags" />
        ) : (
          <>
            <div><label className="block text-sm font-medium text-gray-400 mb-2">Paste HTML code:</label><textarea value={html} onChange={(e) => setHtml(e.target.value)} placeholder="Paste HTML source code..." className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm" rows={8} /></div>
            <div className="flex gap-3"><button onClick={handlePasteAnalyze} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Analyze OG Tags</button><button onClick={() => { setHtml(""); setResults(null) }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button></div>
          </>
        )}

        {progress && <div className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl"><div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" /><span className="text-purple-300">{progress}</span></div>}
        {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"><p className="text-red-400 text-sm">❌ {error}</p></div>}

        {results && (
  <div className="space-y-2">
    {results.map((r, i) => (
      <div key={i} className={`p-4 rounded-xl border ${r.status === "pass" ? "bg-green-500/5 border-green-500/20" : r.status === "warn" ? "bg-yellow-500/5 border-yellow-500/20" : "bg-red-500/5 border-red-500/20"}`}>
        <div className="flex items-start gap-3">
          <StatusIcon status={r.status} />
          <div>
            <h4 className="font-medium text-gray-200">{r.name}</h4>
            <p className="text-gray-400 text-sm mt-1">{r.message}</p>
            {r.value && <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{r.value}</pre>}
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </ToolPage>
  )
}
