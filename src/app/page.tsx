import ToolCard from '@/components/ToolCard'

const allTools = [
  // Text Tools
  { name: 'Word Counter', description: 'Count words, characters, sentences, paragraphs and reading time', icon: '📊', href: '/tools/text/word-counter', category: 'text' },
  { name: 'Character Counter', description: 'Count letters, digits, spaces, special characters in text', icon: '🔤', href: '/tools/text/character-counter', category: 'text' },
  { name: 'Case Converter', description: 'Convert text to UPPER, lower, Title, Sentence, camelCase, snake_case', icon: '🔄', href: '/tools/text/case-converter', category: 'text' },
  { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs and projects', icon: '📝', href: '/tools/text/lorem-ipsum', category: 'text' },
  { name: 'Text Reverser', description: 'Reverse text by character, word, sentence, or line', icon: '🔃', href: '/tools/text/text-reverser', category: 'text' },
  { name: 'Text Sorter', description: 'Sort text alphabetically, by length, random, or remove duplicates', icon: '📋', href: '/tools/text/text-sorter', category: 'text' },
  { name: 'Text to Slug', description: 'Convert text to URL-friendly slug format', icon: '🔗', href: '/tools/text/text-to-slug', category: 'text' },
  { name: 'Find & Replace', description: 'Find and replace text with regex support', icon: '🔍', href: '/tools/text/find-replace', category: 'text' },
  { name: 'Text Statistics', description: 'Analyze word frequency, average word/sentence length', icon: '📈', href: '/tools/text/text-statistics', category: 'text' },
  { name: 'Remove Duplicates', description: 'Remove duplicate lines, words, or characters from text', icon: '✂️', href: '/tools/text/remove-duplicates', category: 'text' },

  // Security Tools
  { name: 'Password Generator', description: 'Generate secure random passwords with customizable options', icon: '🔐', href: '/tools/security/password-generator', category: 'security' },
  { name: 'UUID Generator', description: 'Generate random UUIDs (v4) in bulk', icon: '🎫', href: '/tools/security/uuid-generator', category: 'security' },
  { name: 'Base64 Encoder/Decoder', description: 'Encode and decode text to/from Base64', icon: '🔢', href: '/tools/security/base64', category: 'security' },
  { name: 'URL Encoder/Decoder', description: 'Encode and decode URLs safely', icon: '🌐', href: '/tools/security/url-encoder', category: 'security' },
  { name: 'HTML Encoder/Decoder', description: 'Encode and decode HTML entities', icon: '📄', href: '/tools/security/html-encoder', category: 'security' },
  { name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-512 hashes (client-side)', icon: '🔒', href: '/tools/security/hash', category: 'security' },
  { name: 'JSON Escape/Unescape', description: 'Escape and unescape JSON strings', icon: '{ }', href: '/tools/security/json-escape', category: 'security' },
  { name: 'Random Number Generator', description: 'Generate random numbers within a range', icon: '🎲', href: '/tools/security/random-number', category: 'security' },
  { name: 'Color Contrast Checker', description: 'Check WCAG color contrast ratio for accessibility', icon: '🎨', href: '/tools/security/contrast', category: 'security' },
  { name: 'Text Checksum', description: 'Calculate simple checksums for text', icon: '✅', href: '/tools/security/checksum', category: 'security' },

  // Design Tools
  { name: 'Color Picker', description: 'Pick colors and see HEX, RGB, HSL formats instantly', icon: '🎯', href: '/tools/design/color-picker', category: 'design' },
  { name: 'Gradient Generator', description: 'Create beautiful CSS gradients with preview', icon: '🌈', href: '/tools/design/gradient-generator', category: 'design' },
  { name: 'Color Palette Generator', description: 'Generate matching color shades from a base color', icon: '🎭', href: '/tools/design/palette-generator', category: 'design' },
  { name: 'CSS Shadow Generator', description: 'Create box-shadow and text-shadow with live preview', icon: '🕶️', href: '/tools/design/shadow-generator', category: 'design' },
  { name: 'Color Converter', description: 'Convert between HEX, RGB, and HSL color formats', icon: '🔄', href: '/tools/design/color-converter', category: 'design' },
  { name: 'Complementary Colors', description: 'Find complementary, triadic colors for any hex', icon: '🎪', href: '/tools/design/complementary', category: 'design' },
  { name: 'Random Color Generator', description: 'Generate random colors with hex codes', icon: '🎲', href: '/tools/design/random-color', category: 'design' },
  { name: 'Random Palette', description: 'Generate random beautiful color palettes', icon: '✨', href: '/tools/design/random-palette', category: 'design' },

  // Developer Tools
  { name: 'JSON Formatter', description: 'Format, minify, and validate JSON with syntax highlighting', icon: '{ }', href: '/tools/dev/json-formatter', category: 'dev' },
  { name: 'JSON to CSV', description: 'Convert JSON arrays to CSV format', icon: '📊', href: '/tools/dev/json-to-csv', category: 'dev' },
  { name: 'CSV to JSON', description: 'Convert CSV data to JSON format', icon: '📋', href: '/tools/dev/csv-to-json', category: 'dev' },
  { name: 'Regex Tester', description: 'Test regex patterns with match highlighting', icon: '⚡', href: '/tools/dev/regex-tester', category: 'dev' },
  { name: 'HTML Formatter', description: 'Format and beautify HTML code', icon: '📄', href: '/tools/dev/html-formatter', category: 'dev' },
  { name: 'CSS Formatter', description: 'Format and beautify CSS/SCSS code', icon: '🎨', href: '/tools/dev/css-formatter', category: 'dev' },
  { name: 'Diff Checker', description: 'Compare two texts and see differences', icon: '🔀', href: '/tools/dev/diff-checker', category: 'dev' },
  { name: 'MIME Type Detector', description: 'Find MIME type by file extension', icon: '📁', href: '/tools/dev/mime-type', category: 'dev' },

  // Calculator Tools
  { name: 'BMI Calculator', description: 'Calculate your Body Mass Index and healthy weight range', icon: '⚖️', href: '/tools/calculator/bmi', category: 'calculator' },
  { name: 'Age Calculator', description: 'Calculate exact age in years, months, days from birthdate', icon: '🎂', href: '/tools/calculator/age', category: 'calculator' },
  { name: 'Tip Calculator', description: 'Calculate tip and split bills between people', icon: '💵', href: '/tools/calculator/tip', category: 'calculator' },
  { name: 'Unit Converter', description: 'Convert between length, weight, speed, data, area, volume', icon: '📏', href: '/tools/calculator/unit-converter', category: 'calculator' },
  { name: 'Discount Calculator', description: 'Calculate final price after discount percentage', icon: '🏷️', href: '/tools/calculator/discount', category: 'calculator' },
  { name: 'Loan Calculator', description: 'Calculate monthly payments, total interest for loans', icon: '🏦', href: '/tools/calculator/loan', category: 'calculator' },
  { name: 'Percentage Calculator', description: 'Calculate percentage of a number or between two numbers', icon: '💯', href: '/tools/calculator/percentage', category: 'calculator' },
  { name: 'Salary Calculator', description: 'Convert annual salary to hourly, daily, weekly, monthly', icon: '💰', href: '/tools/calculator/salary', category: 'calculator' },
]

const faqs = [
  {
    question: 'Are all tools on ToolBox Pro really free?',
    answer: 'Yes! All 40+ tools are completely free to use. No signup, no hidden fees, no limits. All tools run directly in your browser.',
  },
  {
    question: 'Do I need to create an account to use these tools?',
    answer: 'No account needed. All tools work instantly — just visit the page and start using them. Your data stays in your browser.',
  },
  {
    question: 'Is my data safe when using these tools?',
    answer: 'Absolutely. All tools run client-side in your browser. Your data is never sent to any server. We don\'t collect, store, or transmit any of your information.',
  },
  {
    question: 'What categories of tools are available?',
    answer: 'ToolBox Pro offers 5 categories: Text Tools (word counter, case converter, etc.), Security Tools (password generator, base64, etc.), Design Tools (color picker, gradient generator, etc.), Developer Tools (JSON formatter, regex tester, etc.), and Calculators (BMI, age, tip, etc.).',
  },
  {
    question: 'Can I use these tools on mobile devices?',
    answer: 'Yes! All tools are fully responsive and work perfectly on phones, tablets, laptops, and desktops.',
  },
  {
    question: 'How is ToolBox Pro different from other online tool websites?',
    answer: 'ToolBox Pro is completely free with no ads, no signup, and no limits. All tools run in your browser for maximum privacy and speed. Plus, it\'s open source on GitHub.',
  },
]

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Free Online Tools
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              {allTools.length}+ free online tools for text, design, development, security, and calculations.
              All run in your browser — no signup, no limits, no data collection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#tools" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all text-lg">
                Browse All Tools
              </a>
              <a href="#categories" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-all text-lg border border-gray-700">
                View Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8" aria-label="Statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Free Tools', value: `${allTools.length}+` },
            { label: 'Categories', value: '5' },
            { label: 'No Signup', value: '✅' },
            { label: 'Free Forever', value: '💯' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Features">
        <h2 className="text-2xl font-bold mb-8 text-center">Why ToolBox Pro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
            <span className="text-4xl block mb-4">🔒</span>
            <h3 className="text-lg font-semibold mb-2">100% Private</h3>
            <p className="text-gray-400 text-sm">All tools run in your browser. Your data never leaves your device.</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
            <span className="text-4xl block mb-4">⚡</span>
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-400 text-sm">No loading, no waiting. Get results instantly with client-side processing.</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
            <span className="text-4xl block mb-4">📱</span>
            <h3 className="text-lg font-semibold mb-2">Works Everywhere</h3>
            <p className="text-gray-400 text-sm">Fully responsive. Works on phone, tablet, laptop, and desktop.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Tool Categories">
        <h2 className="text-2xl font-bold mb-8 text-center">Tool Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 'text', icon: '📝', label: 'Text Tools', desc: '10 tools', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-500/50' },
            { id: 'security', icon: '🔐', label: 'Security', desc: '10 tools', color: 'from-green-500/20 to-green-600/5 border-green-500/20 hover:border-green-500/50' },
            { id: 'design', icon: '🎨', label: 'Design', desc: '8 tools', color: 'from-pink-500/20 to-pink-600/5 border-pink-500/20 hover:border-pink-500/50' },
            { id: 'dev', icon: '💻', label: 'Developer', desc: '8 tools', color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 hover:border-yellow-500/50' },
            { id: 'calculator', icon: '🧮', label: 'Calculator', desc: '8 tools', color: 'from-orange-500/20 to-orange-600/5 border-orange-500/20 hover:border-orange-500/50' },
          ].map((cat) => (
            <a
              key={cat.id}
              href={`/tools/${cat.id}`}
              className={`bg-gradient-to-br ${cat.color} border rounded-2xl p-6 text-center transition-all hover:-translate-y-1`}
            >
              <span className="text-4xl block mb-2">{cat.icon}</span>
              <span className="font-semibold text-gray-300 block">{cat.label}</span>
              <span className="text-xs text-gray-500 mt-1 block">{cat.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* All Tools */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-label="All Tools">
        <h2 className="text-2xl font-bold mb-8 text-center">All {allTools.length}+ Free Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-label="Frequently Asked Questions">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 group">
              <summary className="font-semibold text-gray-200 cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-purple-400 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-label="About">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Free Online Tools — No Signup Required</h2>
          <div className="text-gray-400 space-y-4 text-sm leading-relaxed">
            <p>
              ToolBox Pro provides {allTools.length}+ free online tools for text processing, web development, graphic design, security, and everyday calculations. All tools run directly in your browser using JavaScript — no server processing, no data collection, no signup required.
            </p>
            <p>
              Whether you need to count words in a document, generate secure passwords, format JSON code, create CSS gradients, calculate BMI, or convert units — ToolBox Pro has you covered. Our tools are designed to be fast, private, and easy to use.
            </p>
            <p>
              <strong className="text-gray-300">Text Tools:</strong> Word Counter, Character Counter, Case Converter, Lorem Ipsum Generator, Text Reverser, Text Sorter, Text to Slug, Find & Replace, Text Statistics, Remove Duplicates.
            </p>
            <p>
              <strong className="text-gray-300">Security Tools:</strong> Password Generator, UUID Generator, Base64 Encoder/Decoder, URL Encoder/Decoder, HTML Encoder/Decoder, Hash Generator (SHA-1, SHA-256, SHA-512), JSON Escape/Unescape, Random Number Generator, Color Contrast Checker, Text Checksum.
            </p>
            <p>
              <strong className="text-gray-300">Design Tools:</strong> Color Picker, Gradient Generator, Color Palette Generator, CSS Shadow Generator, Color Converter (HEX/RGB/HSL), Complementary Colors, Triadic Colors, Random Color Generator, Random Palette Generator.
            </p>
            <p>
              <strong className="text-gray-300">Developer Tools:</strong> JSON Formatter, JSON to CSV, CSV to JSON, Regex Tester, HTML Formatter, CSS Formatter, Diff Checker, MIME Type Detector.
            </p>
            <p>
              <strong className="text-gray-300">Calculators:</strong> BMI Calculator, Age Calculator, Tip Calculator, Unit Converter, Discount Calculator, Loan Calculator, Percentage Calculator, Salary Calculator.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-900/30 border border-gray-800 border-dashed rounded-xl p-8 text-center text-gray-600 text-sm">
          Ad Space — AdSense / AdSterra ads will appear here
        </div>
      </section>
    </div>
  )
}
