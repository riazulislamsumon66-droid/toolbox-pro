'use client'

import { useState } from 'react'
import ToolPage from '@/components/ToolPage'
import { runFullSeoAudit, SeoCheck } from '@/tools/seo'

function StatusIcon({ status }: { status: SeoCheck['status'] }) {
  if (status === 'pass') return <span className="text-green-400 text-lg">✅</span>
  if (status === 'warn') return <span className="text-yellow-400 text-lg">⚠️</span>
  return <span className="text-red-400 text-lg">❌</span>
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const bg = score >= 80 ? 'bg-green-400/10 border-green-400/30' : score >= 50 ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-red-400/10 border-red-400/30'
  return (
    <div className={`w-32 h-32 rounded-full border-4 ${bg} flex items-center justify-center`}>
      <span className={`text-4xl font-bold ${color}`}>{score}</span>
    </div>
  )
}

export default function FullSeoAuditPage() {
  const [url, setUrl] = useState('')
  const [html, setHtml] = useState('')
  const [targetKeyword, setTargetKeyword] = useState('')
  const [report, setReport] = useState<ReturnType<typeof runFullSeoAudit> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetchProgress, setFetchProgress] = useState('')
  const [activeTab, setActiveTab] = useState<'url' | 'paste'>('url')

  const handleFetchAndAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL')
      return
    }

    setLoading(true)
    setError('')
    setFetchProgress('Fetching website...')
    setReport(null)

    try {
      // Step 1: Fetch URL via our API
      const fetchRes = await fetch(`/api/fetch-url?url=${encodeURIComponent(url.trim())}`)
      const fetchData = await fetchRes.json()

      if (!fetchRes.ok) {
        setError(fetchData.error || 'Failed to fetch website')
        setLoading(false)
        return
      }

      setFetchProgress('Analyzing SEO...')

      // Step 2: Run SEO audit on fetched HTML
      const result = runFullSeoAudit(fetchData.html, {
        targetKeyword: targetKeyword || undefined,
        baseUrl: fetchData.url,
      })

      setReport(result)
      setHtml(fetchData.html)
    } catch (e: any) {
      setError(e.message || 'Failed to analyze website')
    }

    setLoading(false)
    setFetchProgress('')
  }

  const handlePasteAnalyze = () => {
    if (!html.trim()) {
      setError('Please paste HTML code to analyze')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = runFullSeoAudit(html, { targetKeyword: targetKeyword || undefined })
      setReport(result)
    } catch (e: any) {
      setError(e.message || 'Failed to analyze HTML')
    }
    setLoading(false)
  }

  const passChecks = report?.checks.filter(c => c.status === 'pass') || []
  const warnChecks = report?.checks.filter(c => c.status === 'warn') || []
  const failChecks = report?.checks.filter(c => c.status === 'fail') || []

  return (
    <ToolPage
      title="Full SEO Audit"
      description="Enter any website URL to get a complete SEO analysis — title, meta, headings, images, links, keywords, mobile, structured data, and performance."
      icon="🔍"
      category="seo"
    >
      <div className="space-y-6">
        {/* Tab Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'url'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🌐 Enter URL
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'paste'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            📋 Paste HTML
          </button>
        </div>

        {activeTab === 'url' ? (
          <>
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Website URL to analyze:</label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleFetchAndAnalyze()}
                />
                <button
                  onClick={handleFetchAndAnalyze}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all whitespace-nowrap"
                >
                  {loading ? '⏳ Analyzing...' : '🔍 Analyze'}
                </button>
              </div>
            </div>

            {/* Target Keyword */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Target keyword (optional):</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="e.g., free online tools"
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </>
        ) : (
          <>
            {/* Paste HTML */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Paste HTML code to analyze:</label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Paste your webpage's HTML source code here... (Right-click → View Page Source → Copy)"
                className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono text-sm"
                rows={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Target keyword (optional):</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="e.g., free online tools"
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={handlePasteAnalyze} disabled={loading} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all">
                {loading ? '⏳ Analyzing...' : '🔍 Run Full SEO Audit'}
              </button>
              <button onClick={() => { setHtml(''); setReport(null); setError('') }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">
                Clear
              </button>
            </div>
          </>
        )}

        {/* Progress */}
        {fetchProgress && (
          <div className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-purple-300">{fetchProgress}</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">❌ {error}</p>
          </div>
        )}

        {report && (
          <div className="space-y-6">
            {/* Score */}
            <div className="flex items-center gap-6 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <ScoreRing score={report.score} />
              <div>
                <h3 className="text-xl font-bold mb-1">SEO Score: {report.score}/100</h3>
                <p className="text-gray-400 text-sm">
                  {report.score >= 80 ? 'Great! Your page is well optimized.' :
                   report.score >= 50 ? 'Good, but there are some issues to fix.' :
                   'Needs improvement. Check the failed items below.'}
                </p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="text-green-400">✅ {report.summary.pass} passed</span>
                  <span className="text-yellow-400">⚠️ {report.summary.warn} warnings</span>
                  <span className="text-red-400">❌ {report.summary.fail} failed</span>
                </div>
              </div>
            </div>

            {/* Failed Checks */}
            {failChecks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-3">❌ Failed ({failChecks.length})</h3>
                <div className="space-y-2">
                  {failChecks.map((check, i) => (
                    <div key={i} className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={check.status} />
                        <div>
                          <h4 className="font-medium text-gray-200">{check.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{check.message}</p>
                          {check.value && <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{check.value}</pre>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Checks */}
            {warnChecks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Warnings ({warnChecks.length})</h3>
                <div className="space-y-2">
                  {warnChecks.map((check, i) => (
                    <div key={i} className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={check.status} />
                        <div>
                          <h4 className="font-medium text-gray-200">{check.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{check.message}</p>
                          {check.value && <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{check.value}</pre>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passed Checks */}
            {passChecks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Passed ({passChecks.length})</h3>
                <div className="space-y-2">
                  {passChecks.map((check, i) => (
                    <div key={i} className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={check.status} />
                        <div>
                          <h4 className="font-medium text-gray-200">{check.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{check.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
