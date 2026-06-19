import { MetadataRoute } from 'next'

const BASE_URL = 'https://toolbox-pro.vercel.app'

// All tool pages
const tools = [
  // Text
  'word-counter', 'character-counter', 'case-converter', 'lorem-ipsum',
  'text-reverser', 'text-sorter', 'text-to-slug', 'find-replace',
  'text-statistics', 'remove-duplicates',
  // Security
  'password-generator', 'uuid-generator', 'base64', 'url-encoder',
  'html-encoder', 'hash', 'json-escape', 'random-number', 'contrast', 'checksum',
  // Design
  'color-picker', 'gradient-generator', 'palette-generator', 'shadow-generator',
  'color-converter', 'complementary', 'random-color', 'random-palette',
  // Dev
  'json-formatter', 'json-to-csv', 'csv-to-json', 'regex-tester',
  'html-formatter', 'css-formatter', 'diff-checker', 'mime-type',
  // Calculator
  'bmi', 'age', 'tip', 'unit-converter', 'discount', 'loan', 'percentage', 'salary',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(tool => ({
    url: `${BASE_URL}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryPages = ['text', 'security', 'design', 'dev', 'calculator'].map(cat => ({
    url: `${BASE_URL}/tools/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoryPages,
    ...toolPages,
  ]
}
