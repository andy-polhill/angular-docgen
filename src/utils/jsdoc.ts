export const clean = (text: String) => text
  .split('*')
  .map(line => line.trim().replace(/\* /, ''))
  .filter(line => line.length);
