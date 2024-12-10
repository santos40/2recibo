export const formatCurrency = (value: string | number) => {
  // If value is already a string in Brazilian format (e.g., "1.188,00"), return it with R$ prefix
  if (typeof value === 'string' && value.includes(',')) {
    return `R$ ${value}`;
  }

  // Convert to number and multiply by 1000 to get the correct decimal places for admin panel
  const numericValue = typeof value === 'number' ? value * 1000 : Number(value) * 1000;
  
  // Format using Brazilian locale with exactly 2 decimal places
  return `R$ ${numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal'
  })}`;
};

// Separate formatter for receipts that uses the original value without multiplication
export const formatReceiptCurrency = (value: string | number) => {
  // If value is already a string in Brazilian format (e.g., "1.188,00"), return it with R$ prefix
  if (typeof value === 'string' && value.includes(',')) {
    return `R$ ${value}`;
  }

  // Convert to number without multiplication for receipts
  const numericValue = typeof value === 'number' ? value : Number(value);
  
  // Format using Brazilian locale with exactly 2 decimal places
  return `R$ ${numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal'
  })}`;
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

// Helper function to safely parse currency values from Brazilian format
export const parseCurrencyToNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  // Remove currency symbol and convert from Brazilian format to standard number
  const cleanValue = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')  // Remove thousand separators
    .replace(',', '.');  // Convert decimal separator
    
  return parseFloat(cleanValue) || 0;
};