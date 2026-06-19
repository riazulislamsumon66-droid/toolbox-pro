// Calculator & Utility Tools

// BMI Calculator
export function bmiCalculator(weightKg: number, heightCm: number): string {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return `BMI: ${bmi.toFixed(1)}
Category: ${category}
Healthy weight range: ${(18.5 * heightM * heightM).toFixed(1)} - ${(24.9 * heightM * heightM).toFixed(1)} kg`;
}

// Age Calculator
export function ageCalculator(birthDate: string): string {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return `Age: ${years} years, ${months} months, ${days} days
Total: ~${totalMonths} months / ~${totalWeeks} weeks / ~${totalDays} days
Next birthday: in ${daysUntilBirthday} days`;
}

// Tip Calculator
export function tipCalculator(billAmount: number, tipPercent: number, people: number = 1): string {
  const tip = billAmount * (tipPercent / 100);
  const total = billAmount + tip;
  const perPerson = total / people;
  const tipPerPerson = tip / people;
  
  return `Bill: $${billAmount.toFixed(2)}
Tip (${tipPercent}%): $${tip.toFixed(2)}
Total: $${total.toFixed(2)}
${people > 1 ? `Per person: $${perPerson.toFixed(2)} (includes $${tipPerPerson.toFixed(2)} tip)` : ''}`;
}

// Unit Converter
export function unitConverter(value: number, from: string, to: string): string {
  const conversions: Record<string, Record<string, (v: number) => number>> = {
    // Length (base: meter)
    length: {
      m: (v) => v, cm: (v) => v * 100, mm: (v) => v * 1000,
      km: (v) => v / 1000, in: (v) => v * 39.3701, ft: (v) => v * 3.28084,
      yd: (v) => v * 1.09361, mi: (v) => v / 1609.344
    },
    // Weight (base: kg)
    weight: {
      kg: (v) => v, g: (v) => v * 1000, mg: (v) => v * 1000000,
      lb: (v) => v * 2.20462, oz: (v) => v * 35.274,
      ton: (v) => v / 1000, stone: (v) => v * 0.157473
    },
    // Temperature
    temperature: {
      c: (v) => v, f: (v) => (v - 32) * 5/9, k: (v) => v - 273.15
    },
    // Speed (base: m/s)
    speed: {
      mps: (v) => v, kmh: (v) => v * 3.6, mph: (v) => v * 2.23694,
      knot: (v) => v * 1.94384, fps: (v) => v * 3.28084
    },
    // Data (base: byte)
    data: {
      b: (v) => v, kb: (v) => v * 1024, mb: (v) => v * 1048576,
      gb: (v) => v * 1073741824, tb: (v) => v * 1099511627776
    },
    // Area (base: sq meter)
    area: {
      sqm: (v) => v, sqcm: (v) => v * 10000, sqkm: (v) => v / 1000000,
      sqft: (v) => v * 10.7639, sqin: (v) => v * 1550,
      acre: (v) => v / 4046.86, hectare: (v) => v / 10000
    },
    // Volume (base: liter)
    volume: {
      l: (v) => v, ml: (v) => v * 1000, gal: (v) => v / 3.78541,
      qt: (v) => v / 0.946353, pt: (v) => v / 0.473176,
      cup: (v) => v / 0.236588, floz: (v) => v * 33.814
    }
  };
  
  // Find the category
  let category = '';
  for (const [cat, units] of Object.entries(conversions)) {
    if (units[from] && units[to]) {
      category = cat;
      break;
    }
  }
  
  if (!category) {
    return `Unknown conversion: ${from} → ${to}`;
  }
  
  const baseValue = conversions[category][from](value);
  const result = conversions[category][to](baseValue);
  
  const unitNames: Record<string, Record<string, string>> = {
    length: { m: 'meters', cm: 'centimeters', mm: 'millimeters', km: 'kilometers', in: 'inches', ft: 'feet', yd: 'yards', mi: 'miles' },
    weight: { kg: 'kilograms', g: 'grams', mg: 'milligrams', lb: 'pounds', oz: 'ounces', ton: 'tons', stone: 'stone' },
    temperature: { c: '°C', f: '°F', k: 'K' },
    speed: { mps: 'm/s', kmh: 'km/h', mph: 'mph', knot: 'knots', fps: 'ft/s' },
    data: { b: 'bytes', kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' },
    area: { sqm: 'm²', sqcm: 'cm²', sqkm: 'km²', sqft: 'ft²', sqin: 'in²', acre: 'acres', hectare: 'hectares' },
    volume: { l: 'liters', ml: 'milliliters', gal: 'gallons', qt: 'quarts', pt: 'pints', cup: 'cups', floz: 'fluid ounces' }
  };
  
  return `${value} ${unitNames[category][from]} = ${result.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${unitNames[category][to]}`;
}

// Discount Calculator
export function discountCalculator(originalPrice: number, discountPercent: number): string {
  const discount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discount;
  
  return `Original Price: $${originalPrice.toFixed(2)}
Discount (${discountPercent}%): -$${discount.toFixed(2)}
Final Price: $${finalPrice.toFixed(2)}
You save: $${discount.toFixed(2)}`;
}

// Loan/Mortgage Calculator
export function loanCalculator(principal: number, annualRate: number, years: number): string {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;
  
  return `Loan Amount: $${principal.toLocaleString()}
Interest Rate: ${annualRate}% per year
Term: ${years} years (${numPayments} payments)
Monthly Payment: $${monthlyPayment.toFixed(2)}
Total Payment: $${totalPayment.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}`;
}

// Percentage Calculator
export function percentageCalculator(value: number, total: number): string {
  const percent = (value / total) * 100;
  return `${value} is ${percent.toFixed(2)}% of ${total}
${value}/${total} = ${percent.toFixed(2)}%`;
}

// Countdown Timer (days until date)
export function countdown(targetDate: string): string {
  const target = new Date(targetDate);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  
  if (diff < 0) {
    return `This date was ${Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)))} days ago`;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `Time remaining: ${days} days, ${hours} hours, ${minutes} minutes
Total: ${Math.floor(diff / (1000 * 60 * 60))} hours`;
}

// Time Zone Converter
export function timezoneConverter(time: string, fromTz: string, toTz: string): string {
  try {
    const date = new Date(`2025-01-01T${time}:00`);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: toTz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch {
    return 'Invalid time or timezone';
  }
}

// Salary Calculator
export function salaryCalculator(annualSalary: number, hoursPerWeek: number = 40, weeksPerYear: number = 52): string {
  const hourlyRate = annualSalary / (hoursPerWeek * weeksPerYear);
  const dailyRate = annualSalary / (weeksPerYear * 5);
  const monthlyRate = annualSalary / 12;
  const weeklyRate = annualSalary / weeksPerYear;
  
  return `Annual: $${annualSalary.toLocaleString()}
Monthly: $${monthlyRate.toFixed(2)}
Weekly: $${weeklyRate.toFixed(2)}
Daily (5-day): $${dailyRate.toFixed(2)}
Hourly (${hoursPerWeek}h/week): $${hourlyRate.toFixed(2)}`;
}
