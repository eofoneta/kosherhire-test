export function truncate(length: number, text: string): string {
  if (text.length <= length) return text;
  return text.trim().slice(0, length) + '...';
}
