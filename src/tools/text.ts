// Text Tools - All client-side, no server needed

export interface ToolResult {
  output: string;
  error?: string;
}

// Word Counter
export function wordCounter(text: string): ToolResult {
  if (!text.trim()) return { output: '', error: 'Please enter some text' };
  
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const readingTime = Math.ceil(words.length / 200); // avg reading speed
  
  return {
    output: `Words: ${words.length}
Characters: ${characters}
Characters (no spaces): ${charactersNoSpaces}
Sentences: ${sentences.length}
Paragraphs: ${paragraphs.length}
Reading time: ~${readingTime} min`
  };
}

// Character Counter
export function characterCounter(text: string): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  const total = text.length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const special = total - letters - digits - spaces;
  const lines = text.split('\n').length;
  
  return {
    output: `Total Characters: ${total}
Letters: ${letters}
Digits: ${digits}
Spaces: ${spaces}
Special Characters: ${special}
Lines: ${lines}`
  };
}

// Case Converter
export function caseConverter(text: string, caseType: string): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  switch (caseType) {
    case 'upper':
      return { output: text.toUpperCase() };
    case 'lower':
      return { output: text.toLowerCase() };
    case 'title':
      return {
        output: text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      };
    case 'sentence':
      return {
        output: text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
      };
    case 'toggle':
      return {
        output: text.split('').map(c =>
          c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
        ).join('')
      };
    case 'camel':
      return {
        output: text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
      };
    case 'snake':
      return {
        output: text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
      };
    case 'kebab':
      return {
        output: text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      };
    default:
      return { output: text, error: 'Unknown case type' };
  }
}

// Lorem Ipsum Generator
export function loremIpsum(paragraphs: number = 3): ToolResult {
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
    'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt'
  ];
  
  const result: string[] = [];
  for (let i = 0; i < paragraphs; i++) {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    const sentences: string[] = [];
    for (let j = 0; j < sentenceCount; j++) {
      const wordCount = 8 + Math.floor(Math.random() * 12);
      const words: string[] = [];
      for (let k = 0; k < wordCount; k++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      sentences.push(words.join(' ') + '.');
    }
    result.push(sentences.join(' '));
  }
  
  return { output: result.join('\n\n') };
}

// Text Reverser
export function textReverser(text: string, mode: string = 'full'): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  switch (mode) {
    case 'full':
      return { output: text.split('').reverse().join('') };
    case 'word':
      return { output: text.split(' ').reverse().join(' ') };
    case 'sentence':
      return { output: text.split(/([.!?]+)/).reverse().join('') };
    case 'line':
      return { output: text.split('\n').reverse().join('\n') };
    default:
      return { output: text.split('').reverse().join('') };
  }
}

// Text Sorter
export function textSorter(text: string, mode: string = 'alphabetical'): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  switch (mode) {
    case 'alphabetical':
      return { output: text.split('\n').sort((a, b) => a.localeCompare(b)).join('\n') };
    case 'reverse':
      return { output: text.split('\n').sort((a, b) => b.localeCompare(a)).join('\n') };
    case 'length':
      return { output: text.split('\n').sort((a, b) => a.length - b.length).join('\n') };
    case 'random':
      return { output: text.split('\n').sort(() => Math.random() - 0.5).join('\n') };
    case 'unique':
      return { output: [...new Set(text.split('\n'))].join('\n') };
    default:
      return { output: text };
  }
}

// Text to Slug
export function textToSlug(text: string): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return { output: slug };
}

// Remove Duplicates
export function removeDuplicates(text: string, mode: string = 'line'): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  if (mode === 'line') {
    return { output: [...new Set(text.split('\n'))].join('\n') };
  } else if (mode === 'word') {
    return { output: [...new Set(text.split(/\s+/))].join(' ') };
  } else if (mode === 'char') {
    return { output: [...new Set(text.split(''))].join('') };
  }
  return { output: text };
}

// Text Find & Replace
export function findReplace(text: string, find: string, replace: string, useRegex: boolean = false): ToolResult {
  if (!text || !find) return { output: '', error: 'Please enter text and find value' };
  
  try {
    let result: string;
    if (useRegex) {
      const regex = new RegExp(find, 'g');
      result = text.replace(regex, replace);
    } else {
      result = text.split(find).join(replace);
    }
    const count = useRegex ? (text.match(new RegExp(find, 'g')) || []).length : text.split(find).length - 1;
    return { output: `${result}\n\n[${count} replacements made]` };
  } catch (e) {
    return { output: '', error: 'Invalid regex pattern' };
  }
}

// Text Statistics
export function textStatistics(text: string): ToolResult {
  if (!text) return { output: '', error: 'Please enter some text' };
  
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordFreq: Record<string, number> = {};
  words.forEach(w => {
    const lower = w.toLowerCase().replace(/[^a-z]/g, '');
    if (lower) wordFreq[lower] = (wordFreq[lower] || 0) + 1;
  });
  
  const sorted = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  const avgSentenceLength = words.length / (text.split(/[.!?]+/).filter(s => s.trim()).length || 1);
  
  return {
    output: `📊 Text Statistics
━━━━━━━━━━━━━━━━━━━━
Total Characters: ${text.length}
Total Words: ${words.length}
Unique Words: ${Object.keys(wordFreq).length}
Avg Word Length: ${avgWordLength.toFixed(1)} chars
Avg Sentence Length: ${avgSentenceLength.toFixed(1)} words

🔝 Top 10 Words:
${sorted.map(([word, count], i) => `  ${i + 1}. "${word}" — ${count}x`).join('\n')}`
  };
}
