import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
dayjs.extend(RelativeTime);
dayjs.locale("es");

export function isEmpty(s: string) {
  return s.trim().length === 0;
}

export function formatDate(date: Date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function formatDateToHuman(date: Date) {
  return dayjs(date).fromNow();
}

export function getAgeFromDateOfBirth(dob: Date) {
  const difference = Date.now() - dob.getTime();

  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

export function omitPropFromObject(key: string, obj: any) {
  const { [key]: omited, ...rest } = obj;

  return rest;
}
