// Developer Tools - JSON, Regex, Formatters

// JSON Formatter
export function jsonFormat(jsonString: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, indent);
  } catch (e: any) {
    return `Invalid JSON: ${e.message}`;
  }
}

// JSON Minifier
export function jsonMinify(jsonString: string): string {
  try {
    return JSON.stringify(JSON.parse(jsonString));
  } catch (e: any) {
    return `Invalid JSON: ${e.message}`;
  }
}

// JSON Validator
export function jsonValidate(jsonString: string): string {
  try {
    JSON.parse(jsonString);
    return '✅ Valid JSON';
  } catch (e: any) {
    return `❌ Invalid JSON: ${e.message}`;
  }
}

// JSON to CSV
export function jsonToCsv(jsonString: string): string {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data) || data.length === 0) {
      return 'Input must be a JSON array of objects';
    }
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
}

// CSV to JSON
export function csvToJson(csvString: string): string {
  try {
    const lines = csvString.trim().split('\n');
    if (lines.length < 2) return 'CSV must have at least a header row and one data row';
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] || '';
      });
      return obj;
    });
    
    return JSON.stringify(data, null, 2);
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
}

// Regex Tester
export function regexTest(pattern: string, flags: string, text: string): string {
  try {
    const regex = new RegExp(pattern, flags);
    const matches = text.match(regex);
    const allMatches = [...text.matchAll(new RegExp(pattern, flags + (flags.includes('g') ? '' : 'g')))];
    
    if (allMatches.length === 0) {
      return 'No matches found';
    }
    
    const result = allMatches.map((match, i) => {
      const groups = match.slice(1).length > 0 ? ` | Groups: [${match.slice(1).map(g => `"${g}"`).join(', ')}]` : '';
      return `Match ${i + 1}: "${match[0]}" (index: ${match.index})${groups}`;
    }).join('\n');
    
    return `Found ${allMatches.length} match(es):\n${result}`;
  } catch (e: any) {
    return `Invalid regex: ${e.message}`;
  }
}

// HTML Formatter
export function htmlFormat(html: string, indent: number = 2): string {
  const formatted = html
    .replace(/(<[^>]+>)/g, '\n$1')
    .replace(/\n\n/g, '\n')
    .trim();
  
  let result = '';
  let level = 0;
  const selfClosing = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];
  
  const lines = formatted.split('\n').filter(l => l.trim());
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('</')) {
      level = Math.max(0, level - 1);
    }
    
    result += ' '.repeat(level * indent) + trimmed + '\n';
    
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
      const tagName = trimmed.match(/<(\w+)/)?.[1]?.toLowerCase() || '';
      if (!selfClosing.includes(tagName)) {
        level++;
      }
    }
  }
  
  return result.trim();
}

// CSS Formatter
export function cssFormat(css: string): string {
  return css
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/;\s*/g, ';\n  ')
    .replace(/,\s*/g, ',\n')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// JavaScript Formatter
export function jsFormat(code: string): string {
  // Basic formatting
  let result = code
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/;\s*/g, ';\n')
    .replace(/,\s*/g, ', ')
    .replace(/\n\s*\n/g, '\n');
  return result.trim();
}

// Diff Checker
export function diffCheck(text1: string, text2: string): string {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLen = Math.max(lines1.length, lines2.length);
  const results: string[] = [];
  
  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i] ?? '';
    const l2 = lines2[i] ?? '';
    
    if (l1 === l2) {
      results.push(`  ${l1}`);
    } else {
      if (l1) results.push(`- ${l1}`);
      if (l2) results.push(`+ ${l2}`);
    }
  }
  
  return results.join('\n');
}

// Hash/Checksum info
export function textChecksum(text: string): string {
  // Simple checksum for display purposes
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `Checksum: ${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

// MIME type detector (by extension)
export function mimeType(filename: string): string {
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf', '.zip': 'application/zip', '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4', '.webp': 'image/webp', '.webm': 'video/webm',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
    '.xml': 'application/xml', '.txt': 'text/plain', '.md': 'text/markdown',
    '.mp4': 'video/mp4', '.avi': 'video/x-msvideo', '.csv': 'text/csv',
  };
  
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return mimeTypes[ext] || 'application/octet-stream';
}
