"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { hexToRgb, hexToHsl } from "@/tools/design"

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#6c5ce7")
  return (
    <ToolPage title="Color Picker" description="Pick any color and see HEX, RGB, HSL formats." icon="🎯" category="design">
      <div className="space-y-6">
        <div className="w-full h-40 rounded-xl border border-gray-800" style={{ backgroundColor: hex }} />
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-16 rounded-lg cursor-pointer border-0" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl"><div className="text-xs text-gray-500 mb-1">HEX</div><div className="font-mono font-bold">{hex}</div></div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl"><div className="text-xs text-gray-500 mb-1">RGB</div><div className="font-mono font-bold text-sm">{hexToRgb(hex)}</div></div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl"><div className="text-xs text-gray-500 mb-1">HSL</div><div className="font-mono font-bold text-sm">{hexToHsl(hex)}</div></div>
        </div>
      </div>
    </ToolPage>
  )
}
