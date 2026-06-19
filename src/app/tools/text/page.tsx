import ToolCard from '@/components/ToolCard'

const textTools = [
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
]

export default function TextToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📝 Text Tools</h1>
        <p className="text-gray-400">Free online text tools — count, convert, format, and analyze text</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {textTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
