import { readdir } from 'fs/promises';
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTests() {
  const toolsDir = path.join(__dirname, 'src', 'tools');
  const toolFiles = (await readdir(toolsDir)).filter(f => f.endsWith('.ts'));
  
  let passed = 0, failed = 0;
  
  function test(name, fn) {
    try { fn(); passed++; console.log(`  ✅ ${name}`); }
    catch(e) { failed++; console.log(`  ❌ ${name}: ${e.message}`); }
  }
  
  // Load all tool modules
  const modules = {};
  for (const file of toolFiles) {
    const name = file.replace('.ts', '');
    const mod = await import(pathToFileURL(path.join(toolsDir, file)).href);
    modules[name] = mod;
  }
  
  console.log('\n📝 TEXT TOOLS');
  const t = modules.text;
  test('Word Counter', () => { const r = t.wordCounter('Hello world! This is a test.'); if (!r.output.includes('Words: 6')) throw new Error(r.output); });
  test('Character Counter', () => { const r = t.characterCounter('Hello 123!'); if (!r.output.includes('Total Characters: 10')) throw new Error(r.output); });
  test('Case Converter upper', () => { if (t.caseConverter('hello', 'upper').output !== 'HELLO') throw new Error('upper'); });
  test('Case Converter snake', () => { if (t.caseConverter('hello world', 'snake').output !== 'hello_world') throw new Error('snake'); });
  test('Lorem Ipsum', () => { if (t.loremIpsum(2).output.length < 50) throw new Error('too short'); });
  test('Text Reverser', () => { if (t.textReverser('Hello', 'full').output !== 'olleH') throw new Error('reverse'); });
  test('Text Sorter', () => { if (t.textSorter('b\na\nc', 'alphabetical').output !== 'a\nb\nc') throw new Error('sort'); });
  test('Text to Slug', () => { if (t.textToSlug('Hello World!').output !== 'hello-world') throw new Error('slug'); });
  test('Remove Duplicates', () => { if (t.removeDuplicates('a\nb\na', 'line').output !== 'a\nb') throw new Error('dedup'); });
  test('Find & Replace', () => { if (!t.findReplace('Hi Hi', 'Hi', 'Hello', false).output.includes('Hello Hello')) throw new Error('findreplace'); });
  test('Text Statistics', () => { if (!t.textStatistics('hello world').output.includes('Total Words: 2')) throw new Error('stats'); });
  
  console.log('\n🔐 SECURITY TOOLS');
  const s = modules.security;
  test('Password Generator', () => { const r = s.passwordGenerator({length:16,uppercase:true,lowercase:true,numbers:true,symbols:true,excludeSimilar:false,count:3}); if (r.split('\n').length !== 3) throw new Error('count'); });
  test('Base64 Encode', () => { if (s.base64Encode('Hello World') !== 'SGVsbG8gV29ybGQ=') throw new Error('encode'); });
  test('Base64 Decode', () => { if (s.base64Decode('SGVsbG8gV29ybGQ=') !== 'Hello World') throw new Error('decode'); });
  test('URL Encode', () => { if (s.urlEncode('hello world') !== 'hello%20world') throw new Error('encode'); });
  test('URL Decode', () => { if (s.urlDecode('hello%20world') !== 'hello world') throw new Error('decode'); });
  test('HTML Encode', () => { if (!s.htmlEncode('<div>').includes('&lt;')) throw new Error('encode'); });
  test('HTML Decode', () => { if (s.htmlDecode('&lt;div&gt;') !== '<div>') throw new Error('decode'); });
  test('UUID Generator', () => { const u = s.uuidGenerator(3).split('\n'); if (u.length !== 3 || u[0].length !== 36) throw new Error('uuid'); });
  test('Random Number', () => { const n = s.randomNumber(1, 100, 5).split('\n'); if (n.length !== 5) throw new Error('count'); });
  test('Contrast Checker', () => { if (!s.contrastChecker('#000000', '#ffffff').includes('21.00:1')) throw new Error('contrast'); });
  
  console.log('\n🎨 DESIGN TOOLS');
  const d = modules.design;
  test('HEX to RGB', () => { if (d.hexToRgb('#ff0000') !== 'rgb(255, 0, 0)') throw new Error('hex2rgb'); });
  test('HEX to HSL', () => { if (d.hexToHsl('#ff0000') !== 'hsl(0, 100%, 50%)') throw new Error('hex2hsl'); });
  test('RGB to HEX', () => { if (d.rgbToHex(255, 0, 0) !== '#ff0000') throw new Error('rgb2hex'); });
  test('Palette Generator', () => { if (d.generatePalette('#6c5ce7').length !== 6) throw new Error('palette'); });
  test('Gradient Generator', () => { if (d.generateGradient('#ff0000', '#0000ff', 90) !== 'linear-gradient(90deg, #ff0000, #0000ff)') throw new Error('gradient'); });
  test('CSS Gradient', () => { if (d.cssGradient(['#ff0000','#00ff00'], 'linear', 45) !== 'linear-gradient(45deg, #ff0000, #00ff00)') throw new Error('css-gradient'); });
  test('Box Shadow', () => { if (d.boxShadow({offsetX:4,offsetY:4,blur:10,spread:0,color:'#00000040',inset:false}) !== '4px 4px 10px 0px #00000040') throw new Error('shadow'); });
  test('Complementary', () => { if (d.complementaryColor('#ff0000') !== '#00ffff') throw new Error('complementary'); });
  test('Triadic', () => { if (d.triadicColors('#ff0000').length !== 3) throw new Error('triadic'); });
  test('Random Color', () => { if (d.randomColor().length !== 7) throw new Error('random'); });
  test('Random Palette', () => { if (d.randomPalette(5).length !== 5) throw new Error('random-palette'); });
  
  console.log('\n💻 DEV TOOLS');
  const dev = modules.dev;
  test('JSON Formatter', () => { if (!dev.jsonFormat('{"name":"John"}').includes('"name"')) throw new Error('format'); });
  test('JSON Minifier', () => { if (dev.jsonMinify('{\n  "a": 1\n}') !== '{"a":1}') throw new Error('minify'); });
  test('JSON Validator', () => { if (!dev.jsonValidate('{}').includes('Valid')) throw new Error('validate'); });
  test('JSON to CSV', () => { if (!dev.jsonToCsv('[{"a":1}]').includes('a')) throw new Error('json2csv'); });
  test('CSV to JSON', () => { if (!dev.csvToJson('a,b\n1,2').includes('"a"')) throw new Error('csv2json'); });
  test('Regex Tester', () => { if (!dev.regexTest('[a-z]+', 'g', 'Hello').includes('Found')) throw new Error('regex'); });
  test('Diff Checker', () => { if (!dev.diffCheck('a', 'b').includes('- a')) throw new Error('diff'); });
  test('MIME Type', () => { if (dev.mimeType('index.html') !== 'text/html') throw new Error('mime'); });
  
  console.log('\n🧮 CALCULATOR TOOLS');
  const c = modules.calculator;
  test('BMI', () => { if (!c.bmiCalculator(70, 170).includes('BMI:')) throw new Error('bmi'); });
  test('Age', () => { if (!c.ageCalculator('2000-01-01').includes('years')) throw new Error('age'); });
  test('Tip', () => { if (!c.tipCalculator(100, 15, 2).includes('$15.00')) throw new Error('tip'); });
  test('Unit Converter', () => { if (!c.unitConverter(100, 'cm', 'm').includes('1')) throw new Error('unit'); });
  test('Discount', () => { if (!c.discountCalculator(100, 20).includes('$80.00')) throw new Error('discount'); });
  test('Loan', () => { if (!c.loanCalculator(100000, 5, 30).includes('Monthly Payment')) throw new Error('loan'); });
  test('Percentage', () => { if (!c.percentageCalculator(25, 100).includes('25.00%')) throw new Error('percent'); });
  test('Salary', () => { if (!c.salaryCalculator(52000, 40, 52).includes('Hourly')) throw new Error('salary'); });
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🎉 RESULTS: ${passed} passed, ${failed} failed`);
  console.log(`${'='.repeat(50)}`);
  if (failed > 0) process.exit(1);
}

runTests().catch(e => { console.error(e); process.exit(1); });
