export function getIdString(num: number): string {
  return `ID-${num}`;
}

export function getRandomId(): string {
  return getIdString(Math.random());
}

export function cx(...args: any[]): string {
  return args.filter(Boolean).join(" ");
}

export function map(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
