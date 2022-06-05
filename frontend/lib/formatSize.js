// The amount is based in cm
export default function FormatSize(
  amount = 0,
  unitOfMeasure = "cm",
  showUnitOfMeasure = false,
  square = false
) {
  let formattedAmount = amount;
  switch (unitOfMeasure) {
    case "mm":
      formattedAmount = amount * 10;
      break;
    case "cm":
      formattedAmount = amount;
      break;
    case "dm":
      formattedAmount = amount / 10;
      break;
    case "m":
      formattedAmount = amount / 100;
      break;
    default:
      unitOfMeasure = "m";
      formattedAmount = amount / 100;
  }
  return `${formattedAmount}${showUnitOfMeasure ? unitOfMeasure : ""}${
    square ? "²" : ""
  }`;
}
