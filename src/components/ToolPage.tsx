'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

interface ToolPageProps {
  title: string
  description: string
  icon: string
  category: string
  children: React.ReactNode
}

export default function ToolPage({ title, description, icon, category, children }: ToolPageProps) {
  const categoryLabels: Record<string, string> = {
    text: 'Text Tools',
    security: 'Security Tools',
    design: 'Design Tools',
    dev: 'Developer Tools',
    calculator: 'Calculators',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/tools/${category}`} className="hover:text-purple-400 transition-colors">
          {categoryLabels[category] || category}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-400 mt-1">{description}</p>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
        {children}
      </div>

      {/* Ad Slot */}
      <div className="mt-8 bg-gray-900/30 border border-gray-800 border-dashed rounded-xl p-8 text-center text-gray-600 text-sm">
        Ad Space — AdSense / AdSterra ads will appear here
      </div>

      {/* Back Link */}
      <div className="mt-8 text-center">
        <Link href={`/tools/${category}`} className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Back to {categoryLabels[category] || category}
        </Link>
      </div>
    </div>
  )
}
