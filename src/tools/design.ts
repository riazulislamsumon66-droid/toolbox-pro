// Design Tools - Color, CSS, gradients

// Color conversions
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'Invalid HEX color';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'Invalid HEX color';
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, x)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Generate color palette
export function generatePalette(baseColor: string): string[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(baseColor);
  if (!result) return [];
  
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  
  // Convert to HSL
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  // Generate shades
  const shades: string[] = [];
  const lightnesses = [15, 30, 45, 60, 75, 90];
  for (const lVal of lightnesses) {
    const sn = s * (lVal > 50 ? 0.6 : 1);
    const hn = Math.round(h * 360);
    // HSL to RGB approximation
    const c = (1 - Math.abs(2 * lVal / 100 - 1)) * sn;
    const x = c * (1 - Math.abs((hn / 60) % 2 - 1));
    const m = lVal / 100 - c / 2;
    let rn = 0, gn = 0, bn = 0;
    if (hn < 60) { rn = c; gn = x; }
    else if (hn < 120) { rn = x; gn = c; }
    else if (hn < 180) { gn = c; bn = x; }
    else if (hn < 240) { gn = x; bn = c; }
    else if (hn < 300) { rn = x; bn = c; }
    else { rn = c; bn = x; }
    const hex = rgbToHex(
      Math.round((rn + m) * 255),
      Math.round((gn + m) * 255),
      Math.round((bn + m) * 255)
    );
    shades.push(hex);
  }
  
  return shades;
}

// Generate gradient
export function generateGradient(color1: string, color2: string, angle: number = 90): string {
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// CSS Gradient Generator
export function cssGradient(colors: string[], type: string = 'linear', angle: number = 90): string {
  if (colors.length < 2) return 'Need at least 2 colors';
  
  const colorString = colors.join(', ');
  if (type === 'linear') {
    return `linear-gradient(${angle}deg, ${colorString})`;
  } else if (type === 'radial') {
    return `radial-gradient(circle, ${colorString})`;
  } else if (type === 'conic') {
    return `conic-gradient(from ${angle}deg, ${colorString})`;
  }
  return `linear-gradient(${angle}deg, ${colorString})`;
}

// CSS Box Shadow Generator
export function boxShadow(options: {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}): string {
  const { offsetX, offsetY, blur, spread, color, inset } = options;
  return `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
}

// CSS Text Shadow Generator
export function textShadow(options: {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}): string {
  return `${options.offsetX}px ${options.offsetY}px ${options.blur}px ${options.color}`;
}

// Complementary color
export function complementaryColor(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'Invalid HEX';
  
  const r = 255 - parseInt(result[1], 16);
  const g = 255 - parseInt(result[2], 16);
  const b = 255 - parseInt(result[3], 16);
  
  return rgbToHex(r, g, b);
}

// Triadic colors
export function triadicColors(hex: string): string[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [];
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  const colors: string[] = [hex];
  for (let i = 1; i <= 2; i++) {
    const newH = (h + i * 1 / 3) % 1;
    const c = (1 - Math.abs(2 * l - 1)) * 0.7;
    const x = c * (1 - Math.abs((newH * 6) % 2 - 1));
    const m = l - c / 2;
    let rn = 0, gn = 0, bn = 0;
    const hn = newH * 6;
    if (hn < 1) { rn = c; gn = x; }
    else if (hn < 2) { rn = x; gn = c; }
    else if (hn < 3) { gn = c; bn = x; }
    else if (hn < 4) { gn = x; bn = c; }
    else if (hn < 5) { rn = x; bn = c; }
    else { rn = c; bn = x; }
    colors.push(rgbToHex(
      Math.round((rn + m) * 255),
      Math.round((gn + m) * 255),
      Math.round((bn + m) * 255)
    ));
  }
  
  return colors;
}

// Random color generator
export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Random palette generator
export function randomPalette(count: number = 5): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(randomColor());
  }
  return colors;
}
