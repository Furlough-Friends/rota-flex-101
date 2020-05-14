export const URL = 'http://localhost:8080';
export const FULLTIME_HOURS = 37.5;

// A placeholder for authentication token
export const getAuthenticationToken = (): string => 'xx';

enum DateStrBrand {}

export type DateStr = string & DateStrBrand;

function checkValidDateStr(str: string): str is DateStr {
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
}

export function toDateStr(date: Date | string): DateStr {
  if (typeof date === 'string') {
    if (checkValidDateStr(date)) {
      return date;
    }
    throw new Error(`Invalid date string: ${date}`);
  } else {
    const dateString = date.toISOString().split('T')[0];
    if (checkValidDateStr(dateString)) {
      return dateString;
    }
  }
  throw new Error(`Shouldn't get here (invalid toDateStr provided): ${date}`);
}
