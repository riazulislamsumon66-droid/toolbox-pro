import ToolCard from "@/components/ToolCard"

const calcTools = [
  { name: "BMI Calculator", description: "Calculate your Body Mass Index and healthy weight range", icon: "⚖️", href: "/tools/calculator/bmi", category: "calculator" },
  { name: "Age Calculator", description: "Calculate exact age in years, months, days from birthdate", icon: "🎂", href: "/tools/calculator/age", category: "calculator" },
  { name: "Tip Calculator", description: "Calculate tip and split bills between people", icon: "💵", href: "/tools/calculator/tip", category: "calculator" },
  { name: "Unit Converter", description: "Convert between length, weight, speed, data, area, volume", icon: "📏", href: "/tools/calculator/unit-converter", category: "calculator" },
  { name: "Discount Calculator", description: "Calculate final price after discount percentage", icon: "🏷️", href: "/tools/calculator/discount", category: "calculator" },
  { name: "Loan Calculator", description: "Calculate monthly payments, total interest for loans", icon: "🏦", href: "/tools/calculator/loan", category: "calculator" },
  { name: "Percentage Calculator", description: "Calculate percentage of a number or between two numbers", icon: "💯", href: "/tools/calculator/percentage", category: "calculator" },
  { name: "Salary Calculator", description: "Convert annual salary to hourly, daily, weekly, monthly", icon: "💰", href: "/tools/calculator/salary", category: "calculator" },
]

export default function CalculatorToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🧮 Calculators</h1>
        <p className="text-gray-400">BMI, age, tip, unit converter, loan, salary, and math tools</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calcTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
