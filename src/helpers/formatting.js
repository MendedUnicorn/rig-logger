import { DateTime } from 'luxon';

export const tripLength = (dateFrom, dateTo) => {
  const from = DateTime.fromISO(dateFrom);
  const to = DateTime.fromISO(dateTo);
  const diff = to.diff(from, 'days');

  return diff.toObject().days;
};
