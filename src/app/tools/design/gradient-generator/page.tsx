"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { cssGradient } from "@/tools/design"

export default function GradientGeneratorPage() {
  const [colors, setColors] = useState(["#6c5ce7", "#a29bfe", "#fd79a8"])
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear")
  const [angle, setAngle] = useState(135)
  const [cssCode, setCssCode] = useState("")

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const addColor = () => {
    if (colors.length < 6) setColors([...colors, "#ffffff"])
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index))
  }

  const generateGradient = () => {
    const css = cssGradient(colors, type, angle)
    setCssCode(`background: ${css};`)
  }

  return (
    <ToolPage title="Gradient Generator" description="Create beautiful CSS gradients with live preview." icon="🌈" category="design">
      <div className="space-y-6">
        {/* Preview */}
        <div className="w-full h-40 rounded-xl border border-gray-800" style={{ background: cssGradient(colors, type, angle) }} />

        {/* CSS Output */}
        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">CSS Code:</span>
            <button onClick={() => navigator.clipboard.writeText(cssCode)} className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">📋 Copy</button>
          </div>
          <code className="text-sm text-green-400 font-mono break-all">{cssCode || "Click Generate to create gradient"}</code>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type:</label>
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === t ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>{t}</button>
              ))}
            </div>
          </div>

          {type === "linear" && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Angle: {angle}°</label>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Colors ({colors.length}/6):</label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="color" value={color} onChange={(e) => updateColor(i, e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
                  <span className="text-xs text-gray-500 font-mono">{color}</span>
                  {colors.length > 2 && <button onClick={() => removeColor(i)} className="text-red-400 hover:text-red-300 text-xs">✕</button>}
                </div>
              ))}
              {colors.length < 6 && <button onClick={addColor} className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-700 text-gray-500 hover:border-purple-500 hover:text-purple-400 transition-all flex items-center justify-center">+</button>}
            </div>
          </div>
        </div>

        <button onClick={generateGradient} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Generate CSS</button>
      </div>
    </ToolPage>
  )
}
