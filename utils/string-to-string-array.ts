export function StringToStringArray(s: string): string[] {
  return s.split(',').map((item: string) => item.trim());
}
