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
export const getProsthiki = (proskomidi: string, options?: Options): string => {
  return getProsthikiCalculation(proskomidi, options).date;
}

export const getProsthikiCalculation = (proskomidi: string, options?: Options): DateCalculation => {
  let topiki = options?.topiki ?? 'Αθηνών';

  let argiesDimosiou: string[] = [];
  let days = 5;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(proskomidi.slice(0, 4));
  let prosthiki = getDateInfo(proskomidi, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...argiesDimosiou,
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
    ]),
  });

  return {
    date: prosthiki.date.toISOString().split('T')[0],
    paused: prosthiki.paused,
    skipped: prosthiki.skipped,
    logic: {
      days: days,
      when: 'after',
      reference: 'proskomidi',
    }
  }
};
