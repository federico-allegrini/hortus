export default function FormatId(id, length = 24) {
  if (id.length < length) {
    return id.padEnd(length, "0");
  } else if (id.length === length) {
    const hex = /^[a-fA-F0-9]+$/;
    if (!hex.test(id)) {
      return "".padEnd(length, "0");
    } else {
      return id;
    }
  } else {
    return "".padEnd(length, "0");
  }
}
