import { CalculatedDate, getDateInfo } from '../../../CalculateDates/calculateDate';
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

// interface Options {
//   dimosio?: boolean;
// }
export const getParemvasiCalculation = (start: string, options: Options): CalculatedDate => {
  let argiesDimosiou: string[] = [];
  let days = options?.exoterikou ? 90 : 60;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));

  let paremvasi = getDateInfo(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
      ...danielGetAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
      ...argiesDimosiou,
    ]),
  });

  if (
    new Date('2021-03-21') <= new Date(paremvasi.date) &&
    new Date('2021-03-26') >= new Date(paremvasi.date) &&
    checkIfIncludedSingle(topiki)
  ) {
    paremvasi.date.setDate(paremvasi.date.getDate() + 8);
  }

  return {
    date: paremvasi.date.toISOString().split('T')[0],
    paused: paremvasi.paused,
    skipped: paremvasi.skipped,
    days: days
  }
};
