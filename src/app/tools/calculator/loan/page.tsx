"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { loanCalculator } from "@/tools/calculator"

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(30)
  const [result, setResult] = useState("")
  const handleCalculate = () => setResult(loanCalculator(principal, rate, years))
  return (
    <ToolPage title="Loan Calculator" description="Calculate monthly payments and total interest for loans." icon="🏦" category="calculator">
      <div className="space-y-6">
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Loan Amount: ${principal.toLocaleString()}</label><input type="range" min="1000" max="1000000" step="1000" value={principal} onChange={(e) => setPrincipal(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Interest Rate: {rate}%</label><input type="range" min="0" max="30" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
        <div><label className="block text-sm font-medium text-gray-400 mb-2">Term: {years} years</label><input type="range" min="1" max="50" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" /></div>
        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
