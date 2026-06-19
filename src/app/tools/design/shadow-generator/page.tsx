"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { boxShadow } from "@/tools/design"

export default function ShadowGeneratorPage() {
  const [offsetX, setOffsetX] = useState(4)
  const [offsetY, setOffsetY] = useState(4)
  const [blur, setBlur] = useState(10)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState("#6c5ce740")
  const [inset, setInset] = useState(false)
  const shadow = boxShadow({ offsetX, offsetY, blur, spread, color, inset })
  return (
    <ToolPage title="CSS Shadow Generator" description="Create box-shadow with live preview." icon="🕶️" category="design">
      <div className="space-y-6">
        <div className="w-full h-40 bg-gray-800 rounded-xl flex items-center justify-center"><div className="w-32 h-32 bg-white rounded-xl" style={{ boxShadow: shadow }} /></div>
        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl"><code className="text-sm text-green-400 font-mono">box-shadow: {shadow};</code></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Offset X: {offsetX}px</label><input type="range" min="-50" max="50" value={offsetX} onChange={(e) => setOffsetX(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Offset Y: {offsetY}px</label><input type="range" min="-50" max="50" value={offsetY} onChange={(e) => setOffsetY(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Blur: {blur}px</label><input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Spread: {spread}px</label><input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
        </div>
        <div className="flex items-center gap-4">
          <div><label className="block text-sm font-medium text-gray-400 mb-2">Color:</label><input type="color" value={color.substring(0, 7)} onChange={(e) => setColor(e.target.value + color.substring(7))} className="w-12 h-10 rounded-lg cursor-pointer border-0" /></div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-purple-600" /><span className="text-sm text-gray-300">Inset</span></label>
        </div>
      </div>
    </ToolPage>
  )
}
