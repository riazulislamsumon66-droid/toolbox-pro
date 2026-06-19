"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { passwordGenerator } from "@/tools/security"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [count, setCount] = useState(5)
  const [result, setResult] = useState("")

  const handleGenerate = () => {
    const passwords = passwordGenerator({ length, uppercase, lowercase, numbers, symbols, excludeSimilar: false, count })
    setResult(passwords)
  }

  return (
    <ToolPage title="Password Generator" description="Generate secure random passwords with customizable length and character options." icon="🔐" category="security">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Password length: {length}</label>
          <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Number of passwords: {count}</label>
          <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, onChange: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, onChange: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, onChange: setNumbers },
            { label: "Symbols (!@#$)", checked: symbols, onChange: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-all">
              <input type="checkbox" checked={opt.checked} onChange={(e) => opt.onChange(e.target.checked)} className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">🔑 Generate</button>
          <button onClick={() => setResult("")} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all border border-gray-700">Clear</button>
        </div>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Generated passwords:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl font-mono text-sm space-y-2">
              {result.split("\n").map((pwd, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-gray-800 last:border-0">
                  <span className="text-green-400">{pwd}</span>
                  <button onClick={() => navigator.clipboard.writeText(pwd)} className="text-gray-500 hover:text-gray-300 text-xs">📋</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
