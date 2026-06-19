"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { ageCalculator } from "@/tools/calculator"

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("1990-01-01")
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(ageCalculator(birthDate))
  }

  return (
    <ToolPage title="Age Calculator" description="Calculate exact age in years, months, and days from your birthdate." icon="🎂" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Birth Date:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500" />
        </div>

        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate Age</button>

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
