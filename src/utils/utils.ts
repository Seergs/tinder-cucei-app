import dayjs from "dayjs";

export function isEmpty(s: string) {
  return s.trim().length === 0;
}

export function formatDate(date: Date) {
  return dayjs(date).format("YYYY-MM-DD");
}
