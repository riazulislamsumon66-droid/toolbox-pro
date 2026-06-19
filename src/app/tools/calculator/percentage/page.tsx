"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { percentageCalculator } from "@/tools/calculator"

export default function PercentageCalculatorPage() {
  const [value, setValue] = useState(25)
  const [total, setTotal] = useState(100)
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(percentageCalculator(value, total))
  }

  return (
    <ToolPage title="Percentage Calculator" description="Calculate percentage of a number or between two numbers." icon="💯" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Value: {value}</label>
          <input type="range" min="0" max="10000" value={value} onChange={(e) => setValue(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Total: {total}</label>
          <input type="range" min="1" max="10000" value={total} onChange={(e) => setTotal(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
