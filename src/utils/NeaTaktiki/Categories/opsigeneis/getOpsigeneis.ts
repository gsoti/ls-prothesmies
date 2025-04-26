import { getDateReverseCalculation } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  getAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';
import { DateCalculation } from '../../../../types';

// interface Options {
//   dimosio?: boolean;
// }
export const getOpsigeneis = (start: string, options: Options): string => {
  return getOpsigeneisCalculation(start, options).date;
}

export const getOpsigeneisCalculation = (start: string, options: Options): DateCalculation => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));
  let days = 20;
  let opsigeneis = getDateReverseCalculation(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'opsigeneis', options?.yliki),
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'opsigeneis', options?.yliki),
      ...danielGetAnastolesAnaDikastirio(topiki, 'opsigeneis', options?.yliki),
      ...argiesDimosiou,
    ]),
  });

  return {
    date: opsigeneis.date.toISOString().split('T')[0],
    paused: opsigeneis.paused,
    skipped: opsigeneis.skipped,
    logic: {
      days: days,
      when: 'before',
      reference: 'dikasimos',
      start: start,
    }
  }
};
