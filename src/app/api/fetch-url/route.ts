import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  // Validate URL
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol')
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL format. Must start with http:// or https://' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

    const response = await fetch(parsedUrl.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ToolBoxPro-Bot/1.0; +https://toolbox-pro.vercel.app)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'identity',
      },
      redirect: 'follow',
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 502 }
      )
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return NextResponse.json(
        { error: 'URL does not point to an HTML page.' },
        { status: 400 }
      )
    }

    const html = await response.text()

    // Limit size to 5MB
    if (html.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Page too large. Maximum 5MB allowed.' },
        { status: 413 }
      )
    }

    return NextResponse.json({
      html,
      url: parsedUrl.href,
      status: response.status,
      contentType,
      size: html.length,
    })
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out. The website took too long to respond.' }, { status: 504 })
    }
    return NextResponse.json(
      { error: `Failed to fetch URL: ${error.message}` },
      { status: 500 }
    )
  }
}
