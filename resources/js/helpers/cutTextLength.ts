export const cutTextLength = (text: string, length: number = 20) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
}
