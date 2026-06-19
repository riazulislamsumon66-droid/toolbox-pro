"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { contrastChecker } from "@/tools/security"

export default function ContrastPage() {
  const [color1, setColor1] = useState("#000000")
  const [color2, setColor2] = useState("#ffffff")
  const [result, setResult] = useState("")
  const handleProcess = () => setResult(contrastChecker(color1, color2))
  return (
    <ToolPage title="Color Contrast Checker" description="Check WCAG color contrast ratio for accessibility." icon="🎨" category="security">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Foreground:</label><input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Background:</label><input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" /></div>
        </div>
        <button onClick={handleProcess} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Check Contrast</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
