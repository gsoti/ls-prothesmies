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

export const getProskomidi = (start: string, options?: Options): string => {
  let topiki = options?.topiki ?? 'Αθηνών';

  let argiesDimosiou: string[] = [];
  let days = 20;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(start.slice(0, 4));
  let proskomidi = getDate(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...argiesDimosiou,
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
    ]),
  });

  return proskomidi.toISOString().split('T')[0];
};
