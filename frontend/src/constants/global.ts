import { formatISO, parseISO, isValid } from 'date-fns'

export const URL = 'http://localhost:8080';
export const FULLTIME_HOURS = 37.5;

// A placeholder for authentication token
export const getAuthenticationToken = (): string => 'xx';

enum DateStrBrand {}

export type DateStr = string & DateStrBrand;

function checkValidDateStr(str: string): str is DateStr {
  return isValid(parseISO(str));
}

export function toDateStr(date: Date | string): DateStr {
  if (typeof date === 'string') {
    if (checkValidDateStr(date)) {
      return date;
    }
    throw new Error(`Invalid date string: ${date}`);
  } else {
    const dateString = formatISO(date, {representation: "date"});
    if (checkValidDateStr(dateString)) {
      return dateString;
    }
  }
  throw new Error(`Shouldn't get here (invalid toDateStr provided): ${date}`);
}
