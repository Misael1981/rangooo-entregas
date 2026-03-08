export function isValidCNH(cnh: string): boolean {
  const cleaned = cnh.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;

  // bloqueia sequências repetidas tipo 11111111111
  if (/^(\d)\1+$/.test(cleaned)) return false;

  return true;
}
