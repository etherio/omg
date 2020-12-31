const burmeseNumber = {
  "0": "၀",
  "1": "၁",
  "2": "၂",
  "3": "၃",
  "4": "၄",
  "5": "၅",
  "6": "၆",
  "7": "၇",
  "8": "၈",
  "9": "၉",
};
const year = "နှစ်";
const half = "ခွဲ";

export function translateNumber(input) {
  if (!input) return input;
  return input
    .toString()
    .split("")
    .map((c) => burmeseNumber[c] || c)
    .join("");
}

export function translateAge(age) {
  if (!age) return age;
  let [Y, M] = age
    .toString()
    .split(".")
    .map((a) => parseInt(a) || 0);
  if (Y == 0) {
    return "လသား";
  }
  return `${translateNumber(Y)} ${year}${M ? half : ""}`;
}
