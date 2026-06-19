const path = require('path');
process.chdir(path.join(__dirname, '..'));
require('module').Module._initPaths();

const { wordCounter, characterCounter, caseConverter, loremIpsum, textReverser, textSorter, textToSlug, removeDuplicates, findReplace, textStatistics } = require('./tools/text');
const { passwordGenerator, base64Encode, base64Decode, urlEncode, urlDecode, htmlEncode, htmlDecode, uuidGenerator, randomNumber, contrastChecker } = require('./tools/security');
const { hexToRgb, hexToHsl, rgbToHex, generatePalette, generateGradient, cssGradient, boxShadow, complementaryColor, triadicColors, randomColor, randomPalette } = require('./tools/design');
const { jsonFormat, jsonMinify, jsonValidate, jsonToCsv, csvToJson, regexTest, diffCheck, mimeType } = require('./tools/dev');
const { bmiCalculator, ageCalculator, tipCalculator, unitConverter, discountCalculator, loanCalculator, percentageCalculator, salaryCalculator } = require('./tools/calculator');

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✅ ${name}`); }
  catch(e) { failed++; console.log(`  ❌ ${name}: ${e.message}`); }
}

console.log('📝 TEXT TOOLS');
test('Word Counter', () => { const r = wordCounter('Hello world! This is a test.'); if (r.output !== 'Words: 6\nCharacters: 28\nCharacters (no spaces): 23\nSentences: 2\nParagraphs: 1\nReading time: ~1 min') throw new Error(r.output); });
test('Character Counter', () => { const r = characterCounter('Hello 123!'); if (!r.output.includes('Total Characters: 10')) throw new Error(r.output); });
test('Case Converter', () => { if (caseConverter('hello world', 'upper').output !== 'HELLO WORLD') throw new Error('upper'); if (caseConverter('hello world', 'snake').output !== 'hello_world') throw new Error('snake'); });
test('Lorem Ipsum', () => { if (loremIpsum(2).output.length < 50) throw new Error('too short'); });
test('Text Reverser', () => { if (textReverser('Hello', 'full').output !== 'olleH') throw new Error('reverse'); });
test('Text Sorter', () => { if (textSorter('banana\napple\ncherry', 'alphabetical').output !== 'apple\nbanana\ncherry') throw new Error('sort'); });
test('Text to Slug', () => { if (textToSlug('Hello World!').output !== 'hello-world') throw new Error('slug'); });
test('Remove Duplicates', () => { if (removeDuplicates('apple\nbanana\napple\ncherry', 'line').output !== 'apple\nbanana\ncherry') throw new Error('dedup'); });
test('Find & Replace', () => { if (!findReplace('Hello World Hello', 'Hello', 'Hi', False).output.includes('Hi World Hi')) throw new Error('findreplace'); });
test('Text Statistics', () => { if (!textStatistics('Hello hello world').output.includes('Total Words: 3')) throw new Error('stats'); });

console.log('\n🔐 SECURITY TOOLS');
test('Password Generator', () => { const r = passwordGenerator({length:16,uppercase:true,lowercase:true,numbers:true,symbols:true,excludeSimilar:false,count:3}); if (r.split('\n').length !== 3) throw new Error('count'); });
test('Base64', () => { if (base64Encode('Hello World') !== 'SGVsbG8gV29ybGQ=') throw new Error('encode'); if (base64Decode('SGVsbG8gV29ybGQ=') !== 'Hello World') throw new Error('decode'); });
test('URL Encode', () => { if (urlEncode('hello world') !== 'hello%20world') throw new Error('encode'); if (urlDecode('hello%20world') !== 'hello world') throw new Error('decode'); });
test('HTML Encode', () => { if (!htmlEncode('<div>Hello & World</div>').includes('&lt;div&gt;')) throw new Error('encode'); });
test('UUID Generator', () => { const u = uuidGenerator(3).split('\n'); if (u.length !== 3 || u[0].length !== 36) throw new Error('uuid'); });
test('Random Number', () => { const n = randomNumber(1, 100, 5).split('\n'); if (n.length !== 5) throw new Error('count'); });
test('Contrast Checker', () => { if (!contrastChecker('#000000', '#ffffff').includes('21.00:1')) throw new Error('contrast'); });

console.log('\n🎨 DESIGN TOOLS');
test('HEX to RGB', () => { if (hexToRgb('#ff0000') !== 'rgb(255, 0, 0)') throw new Error('hex2rgb'); });
test('HEX to HSL', () => { if (hexToHsl('#ff0000') !== 'hsl(0, 100%, 50%)') throw new Error('hex2hsl'); });
test('RGB to HEX', () => { if (rgbToHex(255, 0, 0) !== '#ff0000') throw new Error('rgb2hex'); });
test('Palette Generator', () => { if (generatePalette('#6c5ce7').length !== 6) throw new Error('palette'); });
test('Gradient Generator', () => { if (generateGradient('#ff0000', '#0000ff', 90) !== 'linear-gradient(90deg, #ff0000, #0000ff)') throw new Error('gradient'); });
test('CSS Gradient', () => { if (cssGradient(['#ff0000','#00ff00','#0000ff'], 'linear', 45) !== 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)') throw new Error('css-gradient'); });
test('Box Shadow', () => { if (boxShadow({offsetX:4,offsetY:4,blur:10,spread:0,color:'#00000040',inset:false}) !== '4px 4px 10px 0px #00000040') throw new Error('shadow'); });
test('Complementary', () => { if (complementaryColor('#ff0000') !== '#00ffff') throw new Error('complementary'); });
test('Triadic', () => { if (triadicColors('#ff0000').length !== 3) throw new Error('triadic'); });
test('Random Color', () => { if (randomColor().length !== 7) throw new Error('random'); });
test('Random Palette', () => { if (randomPalette(5).length !== 5) throw new Error('random-palette'); });

console.log('\n💻 DEV TOOLS');
test('JSON Formatter', () => { if (!jsonFormat('{"name":"John","age":30}').includes('"name": "John"')) throw new Error('format'); });
test('JSON Minifier', () => { if (jsonMinify('{\n  "name": "John",\n  "age": 30\n}') !== '{"name":"John","age":30}') throw new Error('minify'); });
test('JSON Validator', () => { if (!jsonValidate('{"name":"John}').includes('Invalid')) throw new Error('validate'); });
test('JSON to CSV', () => { if (!jsonToCsv('[{"name":"John","age":30}]').includes('name,age')) throw new Error('json2csv'); });
test('CSV to JSON', () => { if (!csvToJson('name,age\nJohn,30').includes('"name": "John"')) throw new Error('csv2json'); });
test('Regex Tester', () => { if (!regexTest('[a-z]+', 'g', 'Hello World 123').includes('Found 2 match')) throw new Error('regex'); });
test('Diff Checker', () => { const r = diffCheck('Hello World', 'Hello Earth'); if (!r.includes('- World') || !r.includes('+ Earth')) throw new Error('diff'); });
test('MIME Type', () => { if (mimeType('index.html') !== 'text/html') throw new Error('mime'); });

console.log('\n🧮 CALCULATOR TOOLS');
test('BMI', () => { if (!bmiCalculator(70, 170).includes('BMI:')) throw new Error('bmi'); });
test('Age', () => { if (!ageCalculator('2000-01-01').includes('years')) throw new Error('age'); });
test('Tip', () => { if (!tipCalculator(100, 15, 2).includes('$15.00')) throw new Error('tip'); });
test('Unit Converter', () => { if (!unitConverter(100, 'cm', 'm').includes('1')) throw new Error('unit'); });
test('Discount', () => { if (!discountCalculator(100, 20).includes('$80.00')) throw new Error('discount'); });
test('Loan', () => { if (!loanCalculator(100000, 5, 30).includes('Monthly Payment')) throw new Error('loan'); });
test('Percentage', () => { if (!percentageCalculator(25, 100).includes('25.00%')) throw new Error('percent'); });
test('Salary', () => { if (!salaryCalculator(52000, 40, 52).includes('Hourly')) throw new Error('salary'); });

console.log(`\n${'='.repeat(50)}`);
console.log(`🎉 RESULTS: ${passed} passed, ${failed} failed`);
console.log(`${'='.repeat(50)}`);
if (failed > 0) process.exit(1);
