import { formatISO, isValid, parseISO } from 'date-fns';

export const serializeDate = (date: Date = new Date()) => {
  const asString = formatISO(date, { representation: 'date' });

  if (isValid(parseISO(asString))) {
    return asString;
  }

  throw new Error(`Invalid date: ${asString}`);
};
