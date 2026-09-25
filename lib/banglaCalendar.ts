const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
}

const BANGLA_MONTHS = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

/**
 * Returns current date according to the Revised Bangla Academy Calendar (standard in Bangladesh).
 * - April 14 = 1st Boishakh
 * - First 6 months (Boishakh–Ashwin) have 31 days
 * - Next 4 months (Kartik–Magh) have 30 days
 * - Falgun has 29 days (30 in leap years)
 * - Chaitra has 30 days
 */
export function getBanglaDate(date = new Date()): string {
  const gYear = date.getFullYear();
  const isLeap = (gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0;

  const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap ? 30 : 29, 30];
  const boishakh1 = new Date(gYear, 3, 14); // April 14

  let bnYear: number;
  let dayDiff: number;

  if (date >= boishakh1) {
    bnYear = gYear - 593;
    dayDiff = Math.floor((date.getTime() - boishakh1.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    bnYear = gYear - 594;
    const prevBoishakh = new Date(gYear - 1, 3, 14);
    dayDiff = Math.floor((date.getTime() - prevBoishakh.getTime()) / (1000 * 60 * 60 * 24));
  }

  let monthIndex = 0;
  while (monthIndex < 12 && dayDiff >= monthDays[monthIndex]) {
    dayDiff -= monthDays[monthIndex];
    monthIndex++;
  }

  const bnDay = dayDiff + 1;
  const bnMonth = BANGLA_MONTHS[monthIndex % 12];

  return `${toBengaliNumber(bnDay)} ${bnMonth}, ${toBengaliNumber(bnYear)} বঙ্গাব্দ`;
}

// 10 August 2024
const START_DATE = new Date("2024-08-10T00:00:00+06:00");

export function getDaysTogether(currentDate = new Date()): string {
  const diffTime = currentDate.getTime() - START_DATE.getTime();
  const diffDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const formattedEn = new Intl.NumberFormat("en-US").format(diffDays);
  return toBengaliNumber(formattedEn);
}
