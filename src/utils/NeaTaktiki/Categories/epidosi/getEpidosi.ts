import { getDateInfo } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import { checkIfIncludedSingle } from '../../Anastoles/prosthikiHmeron2021';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  getAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';
import { DateCalculation } from '../../../../types';

// interface Options {
//   dimosio?: boolean;
// }
export const getEpidosiCalculation = (start: string, options: Options): DateCalculation => {
  let argiesDimosiou: string[] = [];
  let days = options?.exoterikou ? 60 : 30;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';
  const year = parseInt(start.slice(0, 4));
  let epidosi = getDateInfo(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
      ...argiesDimosiou,
    ]),
  });

  if (
    new Date('2021-03-21') <= new Date(epidosi.date) &&
    new Date('2021-03-26') >= new Date(epidosi.date) &&
    checkIfIncludedSingle(topiki)
  ) {
    epidosi.date.setDate(epidosi.date.getDate() + 8);
  }
  return {
    date: epidosi.date.toISOString().split('T')[0],
    paused: epidosi.paused,
    skipped: epidosi.skipped,
    logic: {
      days: days,
      when: 'after',
      reference: 'katathesi',
    }
  }
};
