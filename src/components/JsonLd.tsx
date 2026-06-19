'use client'

export function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolBox Pro',
    url: 'https://toolbox-pro.vercel.app',
    description: 'Free online tools for text, design, development, security, and calculations. No signup required.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolbox-pro.vercel.app/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ToolBox Pro',
    url: 'https://toolbox-pro.vercel.app',
    description: 'Free online tools for everyone. 40+ tools including Word Counter, Password Generator, JSON Formatter, Color Picker, and more.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToolBox Pro',
    url: 'https://toolbox-pro.vercel.app',
    logo: 'https://toolbox-pro.vercel.app/logo.png',
    sameAs: [
      'https://github.com/riazulislamsumon66-droid/toolbox-pro',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolbox-pro.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Text Tools',
        item: 'https://toolbox-pro.vercel.app/tools/text',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Security Tools',
        item: 'https://toolbox-pro.vercel.app/tools/security',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Design Tools',
        item: 'https://toolbox-pro.vercel.app/tools/design',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Developer Tools',
        item: 'https://toolbox-pro.vercel.app/tools/dev',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Calculators',
        item: 'https://toolbox-pro.vercel.app/tools/calculator',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
