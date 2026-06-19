'use client'

import Link from 'next/link'

interface ToolCardProps {
  name: string
  description: string
  icon: string
  href: string
  category: string
}

export default function ToolCard({ name, description, icon, href, category }: ToolCardProps) {
  const categoryColors: Record<string, string> = {
    text: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    security: 'bg-green-500/10 text-green-400 border-green-500/20',
    design: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    dev: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    calculator: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  }

  return (
    <Link href={href} className="group">
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 h-full hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <span className="text-3xl">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors mb-1">
              {name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {description}
            </p>
            <span className={`inline-block mt-3 px-2 py-0.5 rounded-full text-xs border ${categoryColors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
