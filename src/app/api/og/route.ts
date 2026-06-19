import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get('title') || 'ToolBox Pro'
  const icon = searchParams.get('icon') || '🧰'

  // Generate a simple SVG OG image
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0f"/>
      <stop offset="50%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#0a0a0f"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6c5ce7;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#a29bfe;stop-opacity:0.1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#glow)"/>
  <circle cx="100" cy="100" r="200" fill="#6c5ce7" opacity="0.1"/>
  <circle cx="1100" cy="530" r="250" fill="#a29bfe" opacity="0.08"/>
  <text x="600" y="220" font-family="system-ui, sans-serif" font-size="80" text-anchor="middle" fill="#6c5ce7">${icon}</text>
  <text x="600" y="340" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(title)}</text>
  <text x="600" y="400" font-family="system-ui, sans-serif" font-size="24" text-anchor="middle" fill="#9ca3af">Free Online Tool — No Signup Required</text>
  <text x="600" y="550" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle" fill="#6c5ce7">toolbox-pro.vercel.app</text>
</svg>`.trim()

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
