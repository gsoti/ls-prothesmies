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
export const getParemvasiProsekCalculation = (start: string, options: Options): CalculatedDate => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let days = options?.exoterikou ? 120 : 90;

  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));

  let paremvasi_prosek = getDateInfo(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'paremvasi_prosek', options?.yliki),
      ...barbaraGetAnastolesAnaDikastirio(
        topiki,
        'paremvasi_prosek',
        options?.yliki
      ),
      ...danielGetAnastolesAnaDikastirio(
        topiki,
        'paremvasi_prosek',
        options?.yliki
      ),
      ...argiesDimosiou,
    ]),
  });
  if (
    new Date('2021-03-21') <= new Date(paremvasi_prosek.date) &&
    new Date('2021-03-26') >= new Date(paremvasi_prosek.date) &&
    checkIfIncludedSingle(topiki)
  ) {
    paremvasi_prosek.date.setDate(paremvasi_prosek.date.getDate() + 8);
  }
  return {
    date: paremvasi_prosek.date.toISOString().split('T')[0],
    paused: paremvasi_prosek.paused,
    skipped: paremvasi_prosek.skipped,
    days: days
  }
};
