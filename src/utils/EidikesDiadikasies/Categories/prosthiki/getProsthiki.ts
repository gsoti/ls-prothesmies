import { getDateErgasimesOnly } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { DateCalculation, DeadlineType } from '../../../../types';
import { getDeadlineNameShort } from '../../../../civilCase/utils';

/**
 * Calculate the prosthiki deadline - 5 working days after dikasimos
 */
export const getProsthiki = (dikasimos: string): string => {
  const year = parseInt(dikasimos.slice(0, 4));

  const prosthiki = getDateErgasimesOnly(dikasimos, 5, {
    argies: argiesFunc(year),
    anastoli: anastoliFunc(year),
  });

  return prosthiki.date.toISOString().split('T')[0];
};

/**
 * Calculate the prosthiki deadline with calculation details
 */
export const getProsthikiCalculation = (dikasimos: string): DateCalculation => {
  const year = parseInt(dikasimos.slice(0, 4));

  let days = 5;
  const prosthiki = getDateErgasimesOnly(dikasimos, days, {
    argies: argiesFunc(year),
    anastoli: anastoliFunc(year),
  });

  // Validation: skipped array should always be empty when counting working days
  if (prosthiki.skipped.length > 0) {
    console.error(
      `[getProsthikiCalculation] Unexpected skipped days detected for dikasimos ${dikasimos}:`,
      prosthiki.skipped,
      '\nThis should not happen when counting working days (ergasimes only).'
    );
  }

  return {
    date: prosthiki.date.toISOString().split('T')[0],
    paused: prosthiki.paused,
    skipped: prosthiki.skipped,
    logic: {
      days: days,
      when: 'after',
      reference: DeadlineType.DIKASIMOS,
      start: dikasimos,
      name: getDeadlineNameShort(DeadlineType.DIKASIMOS),
    }
  };
};
