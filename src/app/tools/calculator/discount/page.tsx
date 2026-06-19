"use client"
import { useState } from "react"
import ToolPage from "@/components/ToolPage"
import { discountCalculator } from "@/tools/calculator"

export default function DiscountCalculatorPage() {
  const [price, setPrice] = useState(100)
  const [discount, setDiscount] = useState(20)
  const [result, setResult] = useState("")

  const handleCalculate = () => {
    setResult(discountCalculator(price, discount))
  }

  return (
    <ToolPage title="Discount Calculator" description="Calculate final price after discount percentage." icon="🏷️" category="calculator">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Original Price: ${price}</label>
          <input type="range" min="1" max="10000" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Discount: {discount}%</label>
          <input type="range" min="0" max="100" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
        <button onClick={handleCalculate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all">Calculate</button>
        {result && <div className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-100 font-mono text-sm whitespace-pre-wrap">{result}</div>}
      </div>
    </ToolPage>
  )
}
