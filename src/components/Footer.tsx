import Link from 'next/link'

const categories = [
  { id: 'text', label: 'Text Tools', icon: '📝' },
  { id: 'security', label: 'Security Tools', icon: '🔐' },
  { id: 'design', label: 'Design Tools', icon: '🎨' },
  { id: 'dev', label: 'Developer Tools', icon: '💻' },
  { id: 'calculator', label: 'Calculators', icon: '🧮' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧰</span>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ToolBox Pro
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              Free online tools for everyone. No signup required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Tool Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/tools/${cat.id}`} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/text/word-counter" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Word Counter</Link></li>
              <li><Link href="/tools/security/password-generator" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Password Generator</Link></li>
              <li><Link href="/tools/dev/json-formatter" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/design/gradient-generator" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Gradient Generator</Link></li>
              <li><Link href="/tools/calculator/bmi" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">BMI Calculator</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Home</Link></li>
              <li><span className="text-gray-500 text-sm">Open Source</span></li>
              <li><span className="text-gray-500 text-sm">Free Forever</span></li>
              <li><span className="text-gray-500 text-sm">No Signup Required</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} ToolBox Pro. All tools are free and run in your browser.</p>
        </div>
      </div>
    </footer>
  )
}
