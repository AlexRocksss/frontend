import type { TFunction } from 'next-i18next';

export default function getConfirmationString(t: TFunction, durations: Array<number>) {
  if (durations.length === 0) {
    return '';
  }

  const [ lower, upper ] = durations.map((time) => time / 1_000);

  if (!upper) {
    return t('tx.confirmedWithin', { lower: lower.toLocaleString() });
  }

  if (lower === 0) {
    return t('tx.confirmedWithinMax', { upper: upper.toLocaleString() });
  }

  return t('tx.confirmedWithinRange', { lower: lower.toLocaleString(), upper: upper.toLocaleString() });
}
