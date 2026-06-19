"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { randomPalette } from "@/tools/design"

export default function RandomPalettePage() {
  const [palette, setPalette] = useState<string[]>([])
  const handleGenerate = () => setPalette(randomPalette(5))
  return (
    <ToolPage title="Random Palette Generator" description="Generate random beautiful color palettes." icon="✨" category="design">
      <div className="space-y-6">
        <button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">✨ Generate Palette</button>
        {palette.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, i) => (
              <div key={i} className="text-center">
                <div className="w-full h-24 rounded-lg border border-gray-800" style={{ backgroundColor: color }} />
                <span className="text-xs font-mono text-gray-500 block mt-2">{color}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
