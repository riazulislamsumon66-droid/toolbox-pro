import ToolCard from '@/components/ToolCard'

const seoTools = [
  { name: 'Full SEO Audit', description: 'Complete SEO analysis — title, meta, headings, images, links, keywords, mobile, structured data', icon: '🔍', href: '/tools/seo/full-audit', category: 'seo' },
  { name: 'Title & Meta Checker', description: 'Check page title, meta description, canonical URL, viewport, and charset', icon: '📝', href: '/tools/seo/title-meta-checker', category: 'seo' },
  { name: 'Open Graph Analyzer', description: 'Analyze OG tags and Twitter Card markup for social sharing', icon: '🌐', href: '/tools/seo/open-graph-analyzer', category: 'seo' },
  { name: 'Heading Structure', description: 'Check H1-H6 heading hierarchy and structure for SEO', icon: '📋', href: '/tools/seo/heading-analyzer', category: 'seo' },
  { name: 'Image Alt Checker', description: 'Find missing alt text on images — important for SEO and accessibility', icon: '🖼️', href: '/tools/seo/image-alt-checker', category: 'seo' },
  { name: 'Link Analyzer', description: 'Analyze internal, external, nofollow links and anchor text', icon: '🔗', href: '/tools/seo/link-analyzer', category: 'seo' },
  { name: 'Keyword Density', description: 'Analyze keyword frequency and density in content', icon: '📊', href: '/tools/seo/keyword-density', category: 'seo' },
  { name: 'Mobile-Friendly Check', description: 'Check viewport, font sizes, fixed widths, and touch targets', icon: '📱', href: '/tools/seo/mobile-checker', category: 'seo' },
  { name: 'Structured Data', description: 'Check JSON-LD and microdata schema markup', icon: '{ }', href: '/tools/seo/structured-data-checker', category: 'seo' },
  { name: 'Performance Check', description: 'Check page size, image dimensions, scripts, and inline styles', icon: '⚡', href: '/tools/seo/performance-checker', category: 'seo' },
]

export default function SeoToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔍 SEO Analysis Tools</h1>
        <p className="text-gray-400">Free online SEO tools — analyze, check, and fix any website's SEO</p>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">💡 How to use these tools</h2>
        <p className="text-gray-400 text-sm">
          Paste any HTML code or URL to analyze. These tools check title tags, meta descriptions, Open Graph tags, heading structure, image alt text, links, keyword density, mobile-friendliness, structured data, and performance. Get a full SEO score with actionable recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seoTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
