"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { randomColor } from "@/tools/design"

export default function RandomColorPage() {
  const [color, setColor] = useState("#6c5ce7")
  const handleGenerate = () => setColor(randomColor())
  return (
    <ToolPage title="Random Color Generator" description="Generate random colors with hex codes." icon="🎲" category="design">
      <div className="space-y-6">
        <div className="w-full h-40 rounded-xl border border-gray-800" style={{ backgroundColor: color }} />
        <div className="text-center"><span className="text-2xl font-mono font-bold">{color}</span></div>
        <button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all mx-auto block">🎲 Generate Random Color</button>
      </div>
    </ToolPage>
  )
}
