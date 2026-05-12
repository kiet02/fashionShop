export const formatCurrency = (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0đ';
  return num.toLocaleString('vi-VN') + 'đ';
};
