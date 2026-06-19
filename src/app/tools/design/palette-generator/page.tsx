"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { generatePalette } from "@/tools/design"

export default function PaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#6c5ce7")
  const [palette, setPalette] = useState<string[]>([])
  const handleGenerate = () => setPalette(generatePalette(baseColor))
  return (
    <ToolPage title="Color Palette Generator" description="Generate matching color shades from a base color." icon="🎭" category="design">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Base Color:</label><input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" /></div>
          <span className="text-gray-500 font-mono">{baseColor}</span>
        </div>
        <button onClick={handleGenerate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Generate Palette</button>
        {palette.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Palette:</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {palette.map((color, i) => (
                <div key={i} className="text-center">
                  <div className="w-full h-16 rounded-lg border border-gray-800" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-500 font-mono mt-1 block">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
