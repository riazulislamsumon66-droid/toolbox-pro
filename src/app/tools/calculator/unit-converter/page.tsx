"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { unitConverter } from "@/tools/calculator"

const categories = {
  length: { from: "m", to: "ft", label: "Length", units: ["m", "cm", "mm", "km", "in", "ft", "yd", "mi"] },
  weight: { from: "kg", to: "lb", label: "Weight", units: ["kg", "g", "mg", "lb", "oz", "ton", "stone"] },
  temperature: { from: "c", to: "f", label: "Temperature", units: ["c", "f", "k"] },
  speed: { from: "mps", to: "kmh", label: "Speed", units: ["mps", "kmh", "mph", "knot", "fps"] },
  data: { from: "mb", to: "gb", label: "Data", units: ["b", "kb", "mb", "gb", "tb"] },
  area: { from: "sqm", to: "sqft", label: "Area", units: ["sqm", "sqcm", "sqkm", "sqft", "sqin", "acre", "hectare"] },
  volume: { from: "l", to: "gal", label: "Volume", units: ["l", "ml", "gal", "qt", "pt", "cup", "floz"] },
}

type Category = keyof typeof categories

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('length')
  const [value, setValue] = useState(100)
  const [fromUnit, setFromUnit] = useState(categories.length.from)
  const [toUnit, setToUnit] = useState(categories.length.to)
  const [result, setResult] = useState("")

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat)
    setFromUnit(categories[cat].from)
    setToUnit(categories[cat].to)
    setResult("")
  }

  const handleConvert = () => {
    setResult(unitConverter(value, fromUnit, toUnit))
  }

  return (
    <ToolPage title="Unit Converter" description="Convert between length, weight, speed, data, area, and volume units." icon="📏" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category:</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(categories).map(([key, val]) => (
              <button key={key} onClick={() => handleCategoryChange(key as Category)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${category === key ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{val.label}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Value:</label>
          <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">From:</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500">
              {categories[category].units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">To:</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500">
              {categories[category].units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleConvert} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Convert</button>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Result:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm">{result}</div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
