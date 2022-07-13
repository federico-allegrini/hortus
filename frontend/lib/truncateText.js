export default function TruncateText(text, length = 10) {
  if (text.length > length) {
    return `${text.substring(0, length - 4)} ...`;
  }
  return text;
}
