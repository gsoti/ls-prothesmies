import { Deadline } from '../../src/types';

export function formatDeadlines(deadlines: Deadline[]): string {
  const sorted = [...deadlines].sort((a, b) => a.date.localeCompare(b.date));

  if (sorted.length === 0) {
    return '';
  }

  const maxFirstColLength = Math.max(
    ...sorted.map(d => `${d.date} - ${d.shortName}`.length)
  );

  return sorted
    .map(deadline => {
      const firstCol = `${deadline.date} - ${deadline.shortName}`.padEnd(
        maxFirstColLength
      );

      if (!deadline.calculation) {
        return `${firstCol}  manual`;
      }

      const { days, when, reference } = deadline.calculation.logic;
      const paused =
        deadline.calculation.paused.length > 0
          ? ` [paused: ${deadline.calculation.paused.length}]`
          : '';
      const skipped =
        deadline.calculation.skipped.length > 0
          ? ` [skipped: ${deadline.calculation.skipped.join(', ')}]`
          : '';

      return `${firstCol}  ${days} ημέρες ${when} ${reference}${paused}${skipped}`;
    })
    .join('\n');
}
