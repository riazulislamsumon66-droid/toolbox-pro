// Security Tools - All client-side

// Password Generator
export function passwordGenerator(options: {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
  count: number;
}): string {
  let chars = '';
  if (options.uppercase) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  if (options.lowercase) chars += 'abcdefghjkmnpqrstuvwxyz';
  if (options.numbers) chars += '23456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  const passwords: string[] = [];
  for (let i = 0; i < options.count; i++) {
    let password = '';
    for (let j = 0; j < options.length; j++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwords.push(password);
  }
  return passwords.join('\n');
}

// Simple Hash Generator (using SubtleCrypto in browser)
export async function hashGenerator(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Base64 Encoder
export function base64Encode(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return 'Error: Invalid text to encode';
  }
}

// Base64 Decoder
export function base64Decode(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded.trim())));
  } catch {
    return 'Error: Invalid Base64 string';
  }
}

// URL Encoder
export function urlEncode(text: string): string {
  return encodeURIComponent(text);
}

// URL Decoder
export function urlDecode(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return 'Error: Invalid URL encoded string';
  }
}

// HTML Entity Encoder
export function htmlEncode(text: string): string {
  return text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// HTML Entity Decoder
export function htmlDecode(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'",
    '&#39;': "'", '&nbsp;': ' ', '&copy;': '©', '&reg;': '®', '&trade;': '™',
    '&mdash;': '—', '&ndash;': '–', '&hellip;': '…', '&laquo;': '«', '&raquo;': '»'
  };
  let result = text;
  for (const [entity, char] of Object.entries(entities)) {
    result = result.replace(new RegExp(entity, 'g'), char);
  }
  // Handle numeric entities
  result = result.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
  return result;
}

// JSON Escape/Unescape
export function jsonEscape(text: string): string {
  return JSON.stringify(text).slice(1, -1);
}

export function jsonUnescape(text: string): string {
  try {
    return JSON.parse(`"${text}"`);
  } catch {
    return 'Error: Invalid escaped string';
  }
}

// UUID Generator
export function uuidGenerator(count: number = 1): string {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    uuids.push(uuid);
  }
  return uuids.join('\n');
}

// Random Number Generator
export function randomNumber(min: number, max: number, count: number = 1): string {
  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers.join('\n');
}

// Color contrast checker
export function contrastChecker(hex1: string, hex2: string): string {
  const getLuminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => {
      const c = parseInt(x, 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }) || [0, 0, 0];
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return `Contrast Ratio: ${ratio.toFixed(2)}:1
AA Normal Text: ${ratio >= 4.5 ? '✅ Pass' : '❌ Fail'}
AA Large Text: ${ratio >= 3 ? '✅ Pass' : '❌ Fail'}
AAA Normal Text: ${ratio >= 7 ? '✅ Pass' : '❌ Fail'}
AAA Large Text: ${ratio >= 4.5 ? '✅ Pass' : '❌ Fail'}`;
}
