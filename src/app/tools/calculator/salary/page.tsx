"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { salaryCalculator } from "@/tools/calculator"

export default function SalaryCalculatorPage() {
  const [salary, setSalary] = useState(50000)
  const [hours, setHours] = useState(40)
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(salaryCalculator(salary, hours))
  }

  return (
    <ToolPage title="Salary Calculator" description="Convert annual salary to hourly, daily, weekly, monthly." icon="💰" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Annual Salary: ${salary.toLocaleString()}</label>
          <input type="range" min="10000" max="500000" step="1000" value={salary} onChange={(e) => setSalary(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Hours per week: {hours}</label>
          <input type="range" min="1" max="80" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
