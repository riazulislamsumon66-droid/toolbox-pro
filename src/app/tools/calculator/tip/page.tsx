"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { tipCalculator } from "@/tools/calculator"

export default function TipCalculatorPage() {
  const [bill, setBill] = useState(50)
  const [tipPercent, setTipPercent] = useState(15)
  const [people, setPeople] = useState(1)
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(tipCalculator(bill, tipPercent, people))
  }

  return (
    <ToolPage title="Tip Calculator" description="Calculate tip and split bills between people." icon="💵" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Bill Amount: ${bill}</label>
          <input type="range" min="1" max="500" value={bill} onChange={(e) => setBill(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Tip: {tipPercent}%</label>
          <input type="range" min="0" max="50" value={tipPercent} onChange={(e) => setTipPercent(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">People: {people}</label>
          <input type="range" min="1" max="20" value={people} onChange={(e) => setPeople(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
