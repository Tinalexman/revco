export function formatAmountWithCommas(amount: number | string) {
  let strAmount = typeof amount === "number" ? amount.toString() : amount;
  return strAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatNumberInFours(amount: number | string) {
  let strNumber = typeof amount === "number" ? amount.toString() : amount;
  return strNumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1 ");
}

export function formatNumberWithThreesAndFours(
  amount: number | string
): string {
  const strAmount = typeof amount === "number" ? amount.toString() : amount;

  const groups = strAmount
    .split(/(?=(?:\d{4})+$)/)
    .map((group) => group.padEnd(4, "0"));

  const firstThreeDigits = groups[0].slice(0, 3);

  return `${firstThreeDigits} ${groups.slice(1).join(" ")}`;
}

export function unformatNumberWithThreesAndFours(
  formattedNumber: string
): number {
  const trimmedNumber = formattedNumber.trim();
  const isFirstGroup = /^ \d+/.test(trimmedNumber);

  const groups = trimmedNumber.split(/\s+/);

  const firstThreeDigits = parseInt(groups[0], 10);

  const restOfNumber = groups.slice(1).join("");

  let result: number;
  if (isFirstGroup) {
    result = parseInt(`${restOfNumber}${firstThreeDigits}`, 10);
  } else {
    result = parseInt(restOfNumber, 10);
  }

  return result;
}
