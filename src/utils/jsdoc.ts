export const clean = (text: string): string[] => {
  console.log('test', text);
  return text
    .split('/n')
    .map(line => line.trim())
    .filter(line => line.length)
};
