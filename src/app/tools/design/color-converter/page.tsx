"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { hexToRgb, hexToHsl, rgbToHex, rgbToHsl } from "@/tools/design"

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#6c5ce7")
  const [rgb, setRgb] = useState({ r: 108, g: 92, b: 231 })
  const [hsl, setHsl] = useState({ h: 249, s: 76, l: 63 })
  const [mode, setMode] = useState<"hex" | "rgb" | "hsl">("hex")

  const handleHexChange = (value: string) => {
    setHex(value)
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const rgbStr = hexToRgb(value)
      const match = rgbStr.match(/rgb\((\d+), (\d+), (\d+)\)/)
      if (match) {
        setRgb({ r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) })
        const hslStr = hexToHsl(value)
        const hslMatch = hslStr.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)
        if (hslMatch) setHsl({ h: parseInt(hslMatch[1]), s: parseInt(hslMatch[2]), l: parseInt(hslMatch[3]) })
      }
    }
  }

  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, value)) }
    setRgb(newRgb)
    const hexVal = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(hexVal)
    const hslStr = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
    const hslMatch = hslStr.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)
    if (hslMatch) setHsl({ h: parseInt(hslMatch[1]), s: parseInt(hslMatch[2]), l: parseInt(hslMatch[3]) })
  }

  return (
    <ToolPage title="Color Converter" description="Convert between HEX, RGB, and HSL color formats." icon="🔄" category="design">
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="w-full h-24 rounded-xl border border-gray-800" style={{ backgroundColor: hex }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">HEX</label>
            <input type="text" value={hex} onChange={(e) => handleHexChange(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">RGB</label>
            <div className="flex gap-2">
              {(["r", "g", "b"] as const).map((ch) => (
                <input key={ch} type="number" min="0" max="255" value={rgb[ch]} onChange={(e) => handleRgbChange(ch, parseInt(e.target.value) || 0)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono text-center focus:outline-none focus:border-purple-500" />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">HSL</label>
            <div className="flex gap-2">
              <input type="number" min="0" max="360" value={hsl.h} readOnly className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono text-center" />
              <input type="number" min="0" max="100" value={hsl.s} readOnly className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono text-center" />
              <input type="number" min="0" max="100" value={hsl.l} readOnly className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 font-mono text-center" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Enter a HEX value to auto-convert to RGB and HSL
        </div>
      </div>
    </ToolPage>
  )
}
