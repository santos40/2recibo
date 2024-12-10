const units = [
  "",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
];

const tens = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa",
];

const hundreds = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos",
];

function convertToWords(amount: number): string {
  if (amount === 0) return "zero";
  if (amount === 100) return "cem";
  if (amount === 1000) return "mil";
  
  if (amount < 20) return units[amount];
  
  if (amount < 100) {
    const ten = Math.floor(amount / 10);
    const remainder = amount % 10;
    return remainder ? `${tens[ten]} e ${units[remainder]}` : tens[ten];
  }
  
  if (amount < 1000) {
    const hundred = Math.floor(amount / 100);
    const remainder = amount % 100;
    return remainder
      ? `${hundreds[hundred]} e ${convertToWords(remainder)}`
      : hundreds[hundred];
  }
  
  if (amount < 1000000) {
    const thousand = Math.floor(amount / 1000);
    const remainder = amount % 1000;
    
    let thousandText = "";
    if (thousand === 1) {
      thousandText = "mil";
    } else {
      thousandText = `${convertToWords(thousand)} mil`;
    }
    
    if (!remainder) return thousandText;
    
    if (remainder < 100) {
      return `${thousandText} e ${convertToWords(remainder)}`;
    }
    
    return `${thousandText}, ${convertToWords(remainder)}`;
  }
  
  return "valor muito alto";
}

export function formatAmountInWords(amount: string): string {
  // Remove R$ and any spaces
  amount = amount.replace(/R\$\s*/g, '').trim();
  
  // Handle Brazilian currency format (118.888,00 -> 118888.00)
  const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
  
  // Split into reais and centavos
  const [reaisStr, centavosStr = "0"] = cleanAmount.split(".");
  
  // Convert to numbers, ensuring we handle the values correctly
  const reais = parseInt(reaisStr, 10);
  const centavos = parseInt(centavosStr.padEnd(2, "0").slice(0, 2), 10);
  
  // If the value is zero
  if (reais === 0 && centavos === 0) {
    return "zero reais";
  }
  
  // Format reais part
  let result = "";
  if (reais > 0) {
    result = `${convertToWords(reais)} ${reais === 1 ? "real" : "reais"}`;
  }
  
  // Format centavos part
  if (centavos > 0) {
    if (result) {
      result += " e ";
    }
    result += `${convertToWords(centavos)} ${centavos === 1 ? "centavo" : "centavos"}`;
  }
  
  return result;
}