"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { bmiCalculator } from "@/tools/calculator"

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(bmiCalculator(weight, height))
  }

  return (
    <ToolPage title="BMI Calculator" description="Calculate your Body Mass Index and healthy weight range." icon="⚖️" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Weight: {weight} kg</label>
          <input type="range" min="20" max="300" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-600 mt-1"><span>20 kg</span><span>300 kg</span></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Height: {height} cm</label>
          <input type="range" min="100" max="250" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-600 mt-1"><span>100 cm</span><span>250 cm</span></div>
        </div>

        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate BMI</button>

        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Results:</label>
            <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
