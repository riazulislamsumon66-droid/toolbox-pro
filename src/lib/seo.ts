import { Metadata } from 'next'

interface ToolMetadataProps {
  title: string
  description: string
  slug: string
  category: string
  icon: string
}

export function generateToolMetadata({ title, description, slug, category, icon }: ToolMetadataProps): Metadata {
  const fullTitle = `${title} - Free Online Tool | ToolBox Pro`
  const fullDescription = `${description} — Free, no signup required. Works instantly in your browser.`
  const toolUrl = `https://toolbox-pro.vercel.app/tools/${category}/${slug}`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [title.toLowerCase(), category + ' tools', 'free tool', 'online tool', 'no signup'],
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: toolUrl,
      type: 'website',
      images: [
        {
          url: `https://toolbox-pro.vercel.app/api/og?title=${encodeURIComponent(title)}&icon=${encodeURIComponent(icon)}`,
          width: 1200,
          height: 630,
          alt: `${title} - ToolBox Pro`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
    },
    alternates: {
      canonical: toolUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateToolJsonLd({ title, description, slug, category }: ToolMetadataProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: `https://toolbox-pro.vercel.app/tools/${category}/${slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}
