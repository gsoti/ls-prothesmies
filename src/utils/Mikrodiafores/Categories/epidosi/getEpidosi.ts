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
import { DateCalculation, DeadlineType } from '../../../../types';
import { getDeadlineNameShort } from '../../../../civilCase/utils';

// interface Options {
//   dimosio?: boolean;
// }
export const getEpidosi = (start: string, options?: Options): string => {
  return getEpidosiCalculation(start, options).date;
}

export const getEpidosiCalculation = (start: string, options?: Options): DateCalculation => {
  let argiesDimosiou: string[] = [];
  let topiki = options?.topiki ?? 'Αθηνών';
  let days = options?.exoterikou ? 30 : 10;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(start.slice(0, 4));
  let epidosi = getDateInfo(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...argiesDimosiou,
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', 'Ειρ'),
    ]),
  });

  return {
    date: epidosi.date.toISOString().split('T')[0],
    paused: epidosi.paused,
    skipped: epidosi.skipped,
    logic: {
      days: days,
      when: 'after',
      reference: DeadlineType.KATATHESI,
      start: start,
      name: getDeadlineNameShort(DeadlineType.KATATHESI),
    }
  }
};
