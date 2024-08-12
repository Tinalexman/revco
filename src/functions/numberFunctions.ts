export function formatAmountWithCommas(amount: number | string) {
  let strAmount = typeof amount === "number" ? amount.toString() : amount;
  return strAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatNumberInFours(amount: number | string) {
  let strNumber = typeof amount === "number" ? amount.toString() : amount;
  return strNumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1 ");
}
