export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function calcDiscount(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= 0) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
