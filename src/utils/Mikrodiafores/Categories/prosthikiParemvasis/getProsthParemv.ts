import { getDateInfo } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';
import { DateCalculation } from '../../../../types';

// interface Options {
//   dimosio?: boolean;
// }
export const getProsthParemv = (
  proskParemv: string,
  options?: Options
): string => {
  return getProsthParemvCalculation(proskParemv, options).date;
}

export const getProsthParemvCalculation = (
  proskParemv: string,
  options?: Options
): DateCalculation => {
  let topiki = options?.topiki ?? 'Αθηνών';

  let argiesDimosiou: string[] = [];
  let days = 5;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(proskParemv.slice(0, 4));
  let prosthParemv = getDateInfo(proskParemv, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...argiesDimosiou,
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
    ]),
  });

  return {
    date: prosthParemv.date.toISOString().split('T')[0],
    paused: prosthParemv.paused,
    skipped: prosthParemv.skipped,
    logic: {
      days: days,
      when: 'after',
      reference: 'proskomidiParemv',  // TODO: Should double check this 
      start: proskParemv,
    }
  }
};
