"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { complementaryColor, triadicColors } from "@/tools/design"

export default function ComplementaryPage() {
  const [hex, setHex] = useState("#6c5ce7")
  const comp = complementaryColor(hex)
  const triadic = triadicColors(hex)
  return (
    <ToolPage title="Complementary Colors" description="Find complementary and triadic colors." icon="🎪" category="design">
      <div className="space-y-6">
        <div className="flex items-center gap-4"><div><label className="block text-sm font-medium text-gray-400 mb-2">Base Color:</label><input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" /></div><span className="text-gray-500 font-mono">{hex}</span></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Complementary:</label><div className="flex items-center gap-3"><div className="w-20 h-20 rounded-lg border border-gray-800" style={{ backgroundColor: comp }} /><span className="font-mono text-gray-400">{comp}</span></div></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Triadic:</label><div className="flex gap-3">{triadic.map((c, i) => (<div key={i} className="text-center"><div className="w-20 h-20 rounded-lg border border-gray-800" style={{ backgroundColor: c }} /><span className="text-xs font-mono text-gray-500 block mt-1">{c}</span></div>))}</div></div>
      </div>
    </ToolPage>
  )
}
