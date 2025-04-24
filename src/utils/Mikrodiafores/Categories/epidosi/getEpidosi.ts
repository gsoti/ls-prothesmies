import { getDate } from '../../../CalculateDates/calculateDate';
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

// interface Options {
//   dimosio?: boolean;
// }
export const getEpidosi = (start: string, options?: Options): string => {
  let argiesDimosiou: string[] = [];
  let topiki = options?.topiki ?? 'Αθηνών';
  let days = options?.exoterikou ? 30 : 10;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(start.slice(0, 4));
  let epidosi = getDate(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...argiesDimosiou,
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
    ]),
  });

  return epidosi.toISOString().split('T')[0];
};
