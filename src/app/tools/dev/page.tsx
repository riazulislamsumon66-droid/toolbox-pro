import ToolCard from "@/components/ToolCard"

const devTools = [
  { name: "JSON Formatter", description: "Format, minify, and validate JSON with syntax highlighting", icon: "{}", href: "/tools/dev/json-formatter", category: "dev" },
  { name: "JSON to CSV", description: "Convert JSON arrays to CSV format", icon: "📊", href: "/tools/dev/json-to-csv", category: "dev" },
  { name: "CSV to JSON", description: "Convert CSV data to JSON format", icon: "📋", href: "/tools/dev/csv-to-json", category: "dev" },
  { name: "Regex Tester", description: "Test regex patterns with match highlighting", icon: "⚡", href: "/tools/dev/regex-tester", category: "dev" },
  { name: "HTML Formatter", description: "Format and beautify HTML code", icon: "📄", href: "/tools/dev/html-formatter", category: "dev" },
  { name: "CSS Formatter", description: "Format and beautify CSS/SCSS code", icon: "🎨", href: "/tools/dev/css-formatter", category: "dev" },
  { name: "Diff Checker", description: "Compare two texts and see differences", icon: "🔀", href: "/tools/dev/diff-checker", category: "dev" },
  { name: "MIME Type Detector", description: "Find MIME type by file extension", icon: "📁", href: "/tools/dev/mime-type", category: "dev" },
]

export default function DevToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💻 Developer Tools</h1>
        <p className="text-gray-400">JSON formatter, regex tester, code formatter, and dev utilities</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
