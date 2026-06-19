// SEO Analysis Tools - All client-side analysis

export interface SeoCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  value?: string;
}

export interface SeoReport {
  url: string;
  score: number;
  checks: SeoCheck[];
  summary: {
    pass: number;
    warn: number;
    fail: number;
  };
}

// Parse HTML string into a DOM document
function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

// ===== 1. TITLE & META DESCRIPTION CHECKER =====
export function checkTitleAndMeta(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  // Title check
  const title = doc.querySelector('title');
  if (!title || !title.textContent?.trim()) {
    checks.push({ name: 'Page Title', status: 'fail', message: 'No <title> tag found. Every page needs a unique title.' });
  } else {
    const len = title.textContent.length;
    if (len < 10) {
      checks.push({ name: 'Title Length', status: 'fail', message: `Title is only ${len} characters. Recommended: 50-60 characters.`, value: title.textContent });
    } else if (len > 60) {
      checks.push({ name: 'Title Length', status: 'warn', message: `Title is ${len} characters. May be truncated in search results. Recommended: 50-60.`, value: title.textContent });
    } else {
      checks.push({ name: 'Title Length', status: 'pass', message: `Title is ${len} characters — perfect!`, value: title.textContent });
    }
  }

  // Meta description
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (!metaDesc) {
    checks.push({ name: 'Meta Description', status: 'fail', message: 'No meta description found. Add one for better CTR.' });
  } else {
    const content = metaDesc.getAttribute('content') || '';
    if (content.length < 50) {
      checks.push({ name: 'Meta Description Length', status: 'fail', message: `Description is only ${content.length} chars. Recommended: 150-160.`, value: content });
    } else if (content.length > 160) {
      checks.push({ name: 'Meta Description Length', status: 'warn', message: `Description is ${content.length} chars. May be truncated. Recommended: 150-160.`, value: content });
    } else {
      checks.push({ name: 'Meta Description Length', status: 'pass', message: `Description is ${content.length} chars — great!`, value: content });
    }
  }

  // Canonical URL
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    checks.push({ name: 'Canonical URL', status: 'warn', message: 'No canonical URL found. Add one to prevent duplicate content.' });
  } else {
    checks.push({ name: 'Canonical URL', status: 'pass', message: `Canonical URL set: ${canonical.getAttribute('href')}` });
  }

  // Viewport (mobile)
  const viewport = doc.querySelector('meta[name="viewport"]');
  if (!viewport) {
    checks.push({ name: 'Viewport Meta', status: 'fail', message: 'No viewport meta tag. Page may not be mobile-friendly.' });
  } else {
    checks.push({ name: 'Viewport Meta', status: 'pass', message: 'Viewport meta tag found.' });
  }

  // Charset
  const charset = doc.querySelector('meta[charset]') || doc.querySelector('meta[http-equiv="Content-Type"]');
  if (!charset) {
    checks.push({ name: 'Character Encoding', status: 'warn', message: 'No charset declaration found.' });
  } else {
    checks.push({ name: 'Character Encoding', status: 'pass', message: 'Character encoding declared.' });
  }

  return checks;
}

// ===== 2. OPEN GRAPH (OG) TAG ANALYZER =====
export function checkOpenGraph(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name'];
  const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];

  for (const tag of ogTags) {
    const el = doc.querySelector(`meta[property="${tag}"]`);
    if (!el) {
      checks.push({ name: `OG: ${tag}`, status: 'fail', message: `Missing <meta property="${tag}"> tag.` });
    } else {
      const content = el.getAttribute('content') || '';
      checks.push({ name: `OG: ${tag}`, status: 'pass', message: `Found: ${content.substring(0, 80)}${content.length > 80 ? '...' : ''}` });
    }
  }

  for (const tag of twitterTags) {
    const el = doc.querySelector(`meta[name="${tag}"]`);
    if (!el) {
      checks.push({ name: `Twitter: ${tag}`, status: 'warn', message: `Missing <meta name="${tag}"> tag.` });
    } else {
      const content = el.getAttribute('content') || '';
      checks.push({ name: `Twitter: ${tag}`, status: 'pass', message: `Found: ${content.substring(0, 80)}${content.length > 80 ? '...' : ''}` });
    }
  }

  return checks;
}

// ===== 3. HEADING STRUCTURE ANALYZER =====
export function checkHeadings(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  const h1s = doc.querySelectorAll('h1');
  if (h1s.length === 0) {
    checks.push({ name: 'H1 Tag', status: 'fail', message: 'No H1 tag found. Every page should have exactly one H1.' });
  } else if (h1s.length > 1) {
    checks.push({ name: 'H1 Tag', status: 'warn', message: `Found ${h1s.length} H1 tags. Recommended: only 1 per page.`, value: Array.from(h1s).map(h => h.textContent?.trim().substring(0, 50)).join(' | ') });
  } else {
    checks.push({ name: 'H1 Tag', status: 'pass', message: `Found 1 H1: "${h1s[0].textContent?.trim().substring(0, 60)}"` });
  }

  // Check heading hierarchy
  for (let level = 2; level <= 6; level++) {
    const headings = doc.querySelectorAll(`h${level}`);
    if (headings.length > 0) {
      const prevLevel = doc.querySelectorAll(`h${level - 1}`);
      if (prevLevel.length === 0 && level > 2) {
        checks.push({ name: `H${level} without H${level - 1}`, status: 'warn', message: `Found ${headings.length} H${level} tag(s) but no H${level - 1}. Check heading hierarchy.` });
      } else {
        checks.push({ name: `H${level} Tags`, status: 'pass', message: `Found ${headings.length} H${level} tag(s).` });
      }
    }
  }

  return checks;
}

// ===== 4. IMAGE ALT TEXT CHECKER =====
export function checkImageAltText(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  const images = doc.querySelectorAll('img');
  const total = images.length;
  let withAlt = 0;
  let withoutAlt = 0;
  const missingAlts: string[] = [];

  images.forEach(img => {
    const alt = img.getAttribute('alt');
    if (alt === null) {
      withoutAlt++;
      const src = img.getAttribute('src') || 'unknown';
      missingAlts.push(src.substring(0, 60));
    } else {
      withAlt++;
    }
  });

  if (total === 0) {
    checks.push({ name: 'Images', status: 'pass', message: 'No images found on the page.' });
  } else {
    checks.push({ name: 'Total Images', status: 'pass', message: `Found ${total} image(s).` });

    if (withoutAlt > 0) {
      checks.push({
        name: 'Missing Alt Text',
        status: 'fail',
        message: `${withoutAlt} of ${total} images missing alt text. Add descriptive alt text for SEO and accessibility.`,
        value: missingAlts.slice(0, 5).join('\n'),
      });
    } else {
      checks.push({ name: 'Alt Text Coverage', status: 'pass', message: `All ${total} images have alt text!` });
    }
  }

  return checks;
}

// ===== 5. KEYWORD DENSITY ANALYZER =====
export function checkKeywordDensity(html: string, targetKeyword?: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  // Get all text content
  const body = doc.body;
  if (!body) {
    checks.push({ name: 'Content', status: 'fail', message: 'No body content found.' });
    return checks;
  }

  const text = body.innerText || body.textContent || '';
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const totalWords = words.length;

  if (totalWords < 30) {
    checks.push({ name: 'Word Count', status: 'warn', message: `Only ${totalWords} words found. Recommended: 300+ words for SEO.` });
  } else {
    checks.push({ name: 'Word Count', status: 'pass', message: `${totalWords} words found.` });
  }

  // Top keywords
  const freq: Record<string, number> = {};
  const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'were', 'they', 'their', 'what', 'when', 'where', 'which', 'this', 'that', 'with', 'from', 'will', 'would', 'there', 'these', 'than', 'then', 'them', 'into', 'some', 'could', 'other', 'more', 'very', 'just', 'also', 'only', 'such', 'each', 'make', 'like', 'over', 'such', 'take', 'come', 'its', 'who', 'how', 'get', 'may', 'way', 'use', 'her', 'now', 'him', 'any', 'new', 'see', 'two', 'day', 'did', 'got', 'let', 'say', 'she', 'too', 'why', 'about', 'back', 'been', 'before', 'being', 'between', 'both', 'does', 'doing', 'down', 'during', 'few', 'further', 'going', 'here', 'itself', 'most', 'myself', 'nor', 'once', 'only', 'own', 'same', 'should', 'since', 'still', 'through', 'under', 'until', 'up', 'while', 'your']);

  words.forEach(w => {
    if (!stopWords.has(w) && w.length > 3) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  if (sorted.length > 0) {
    checks.push({
      name: 'Top Keywords',
      status: 'pass',
      message: 'Most frequent keywords found:',
      value: sorted.map(([word, count]) => `  "${word}" — ${count}x (${((count / totalWords) * 100).toFixed(1)}%)`).join('\n'),
    });
  }

  // Target keyword check
  if (targetKeyword) {
    const keywordCount = (text.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
    const density = ((keywordCount / totalWords) * 100).toFixed(2);
    if (keywordCount === 0) {
      checks.push({ name: `Target Keyword "${targetKeyword}"`, status: 'fail', message: `Keyword not found in content.` });
    } else if (parseFloat(density) > 5) {
      checks.push({ name: `Target Keyword "${targetKeyword}"`, status: 'warn', message: `Keyword density: ${density}%. Too high — may be seen as keyword stuffing. Recommended: 1-3%.` });
    } else {
      checks.push({ name: `Target Keyword "${targetKeyword}"`, status: 'pass', message: `Found ${keywordCount} times. Density: ${density}% — good!` });
    }
  }

  return checks;
}

// ===== 6. LINK ANALYZER =====
export function checkLinks(html: string, baseUrl?: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  const links = doc.querySelectorAll('a[href]');
  let internal = 0, external = 0, nofollow = 0, empty = 0;

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const rel = link.getAttribute('rel') || '';
    const text = link.textContent?.trim() || '';

    if (!text) empty++;

    if (rel.includes('nofollow')) nofollow++;

    if (href.startsWith('http')) {
      if (baseUrl && href.includes(baseUrl)) {
        internal++;
      } else {
        external++;
      }
    } else if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) {
      internal++;
    }
  });

  checks.push({ name: 'Total Links', status: 'pass', message: `Found ${links.length} links.` });
  checks.push({ name: 'Internal Links', status: 'pass', message: `${internal} internal link(s).` });
  checks.push({ name: 'External Links', status: 'pass', message: `${external} external link(s).` });

  if (nofollow > 0) {
    checks.push({ name: 'Nofollow Links', status: 'pass', message: `${nofollow} nofollow link(s).` });
  }

  if (empty > 0) {
    checks.push({ name: 'Empty Link Text', status: 'warn', message: `${empty} link(s) with empty text. Add descriptive anchor text for SEO.` });
  } else {
    checks.push({ name: 'Link Text', status: 'pass', message: 'All links have text content.' });
  }

  return checks;
}

// ===== 7. MOBILE-FRIENDLY CHECKER =====
export function checkMobileFriendly(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  // Viewport
  const viewport = doc.querySelector('meta[name="viewport"]');
  if (!viewport) {
    checks.push({ name: 'Viewport Meta', status: 'fail', message: 'No viewport meta tag. Page will not render properly on mobile.' });
  } else {
    const content = viewport.getAttribute('content') || '';
    if (content.includes('width=device-width')) {
      checks.push({ name: 'Viewport Width', status: 'pass', message: 'Viewport set to device-width.' });
    } else {
      checks.push({ name: 'Viewport Width', status: 'warn', message: 'Viewport should include width=device-width.' });
    }
  }

  // Check for small font sizes (inline styles)
  const elementsWithStyle = doc.querySelectorAll('[style]');
  let smallFonts = 0;
  elementsWithStyle.forEach(el => {
    const style = el.getAttribute('style') || '';
    const fontSizeMatch = style.match(/font-size:\s*(\d+)px/);
    if (fontSizeMatch && parseInt(fontSizeMatch[1]) < 12) {
      smallFonts++;
    }
  });

  if (smallFonts > 0) {
    checks.push({ name: 'Small Font Sizes', status: 'warn', message: `Found ${smallFonts} element(s) with font-size < 12px. Hard to read on mobile.` });
  } else {
    checks.push({ name: 'Font Sizes', status: 'pass', message: 'No extremely small font sizes detected.' });
  }

  // Check for fixed-width elements
  let fixedWidth = 0;
  elementsWithStyle.forEach(el => {
    const style = el.getAttribute('style') || '';
    if (style.match(/width:\s*\d{4,}px/)) {
      fixedWidth++;
    }
  });

  if (fixedWidth > 0) {
    checks.push({ name: 'Fixed Width Elements', status: 'warn', message: `Found ${fixedWidth} element(s) with width > 999px. May cause horizontal scrolling on mobile.` });
  } else {
    checks.push({ name: 'Responsive Width', status: 'pass', message: 'No overly wide fixed elements detected.' });
  }

  // Touch targets (links/buttons)
  const touchTargets = doc.querySelectorAll('a, button');
  checks.push({ name: 'Touch Targets', status: 'pass', message: `Found ${touchTargets.length} clickable elements. Ensure they are at least 48x48px for touch.` });

  return checks;
}

// ===== 8. STRUCTURED DATA CHECKER =====
export function checkStructuredData(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length === 0) {
    checks.push({ name: 'JSON-LD', status: 'warn', message: 'No JSON-LD structured data found. Add schema markup for rich snippets.' });
  } else {
    checks.push({ name: 'JSON-LD', status: 'pass', message: `Found ${jsonLdScripts.length} JSON-LD script(s).` });

    jsonLdScripts.forEach((script, i) => {
      try {
        const data = JSON.parse(script.textContent || '');
        const type = data['@type'] || 'Unknown';
        checks.push({ name: `Schema Type ${i + 1}`, status: 'pass', message: `Found schema: ${type}` });
      } catch {
        checks.push({ name: `Schema ${i + 1}`, status: 'fail', message: 'Invalid JSON-LD syntax.' });
      }
    });
  }

  // Check for microdata
  const microdata = doc.querySelectorAll('[itemscope]');
  if (microdata.length > 0) {
    checks.push({ name: 'Microdata', status: 'pass', message: `Found ${microdata.length} microdata item(s).` });
  }

  return checks;
}

// ===== 9. PERFORMANCE CHECKER =====
export function checkPerformance(html: string): SeoCheck[] {
  const doc = parseHTML(html);
  const checks: SeoCheck[] = [];

  // Image count and size estimation
  const images = doc.querySelectorAll('img');
  let withoutDimensions = 0;
  images.forEach(img => {
    if (!img.getAttribute('width') && !img.getAttribute('height')) {
      withoutDimensions++;
    }
  });

  if (images.length > 0) {
    checks.push({ name: 'Images', status: 'pass', message: `Found ${images.length} image(s).` });
    if (withoutDimensions > 0) {
      checks.push({ name: 'Image Dimensions', status: 'warn', message: `${withoutDimensions} image(s) missing width/height attributes. Add them to prevent layout shift (CLS).` });
    } else {
      checks.push({ name: 'Image Dimensions', status: 'pass', message: 'All images have dimensions set.' });
    }
  }

  // Script count
  const scripts = doc.querySelectorAll('script[src]');
  if (scripts.length > 10) {
    checks.push({ name: 'External Scripts', status: 'warn', message: `${scripts.length} external scripts. Consider reducing for faster load time.` });
  } else {
    checks.push({ name: 'External Scripts', status: 'pass', message: `${scripts.length} external script(s).` });
  }

  // CSS files
  const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
  checks.push({ name: 'Stylesheets', status: 'pass', message: `${stylesheets.length} stylesheet(s).` });

  // Inline styles
  const inlineStyles = doc.querySelectorAll('[style]');
  if (inlineStyles.length > 20) {
    checks.push({ name: 'Inline Styles', status: 'warn', message: `${inlineStyles.length} elements with inline styles. Move to external CSS for better caching.` });
  }

  // HTML size
  const htmlSize = new Blob([html]).size;
  if (htmlSize > 100000) {
    checks.push({ name: 'Page Size', status: 'warn', message: `HTML is ${(htmlSize / 1024).toFixed(1)}KB. Consider reducing for faster load.` });
  } else {
    checks.push({ name: 'Page Size', status: 'pass', message: `HTML is ${(htmlSize / 1024).toFixed(1)}KB.` });
  }

  return checks;
}

// ===== 10. FULL SEO AUDIT =====
export function runFullSeoAudit(html: string, options?: { targetKeyword?: string; baseUrl?: string }): SeoReport {
  const allChecks: SeoCheck[] = [
    ...checkTitleAndMeta(html),
    ...checkOpenGraph(html),
    ...checkHeadings(html),
    ...checkImageAltText(html),
    ...checkLinks(html, options?.baseUrl),
    ...checkKeywordDensity(html, options?.targetKeyword),
    ...checkMobileFriendly(html),
    ...checkStructuredData(html),
    ...checkPerformance(html),
  ];

  const pass = allChecks.filter(c => c.status === 'pass').length;
  const warn = allChecks.filter(c => c.status === 'warn').length;
  const fail = allChecks.filter(c => c.status === 'fail').length;

  // Calculate score (pass = 1, warn = 0.5, fail = 0)
  const score = Math.round(((pass * 1 + warn * 0.5 + fail * 0) / allChecks.length) * 100);

  return {
    url: options?.baseUrl || 'Unknown',
    score,
    checks: allChecks,
    summary: { pass, warn, fail },
  };
}
