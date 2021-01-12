import dayjs from "dayjs";

export function isEmpty(s: string) {
  return s.trim().length === 0;
}

export function formatDate(date: Date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function getAgeFromDateOfBirth(dob: Date) {
  const difference = Date.now() - dob.getTime();

  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}
