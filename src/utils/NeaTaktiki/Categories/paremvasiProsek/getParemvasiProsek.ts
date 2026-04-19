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
import { DateCalculation, DeadlineType } from '../../../../types';
import { getDeadlineNameShort } from '../../../../civilCase/utils';
import { getEpidosiDays } from '../epidosi/getEpidosiDays';

// interface Options {
//   dimosio?: boolean;
// }
export const getParemvasiProsekCalculation = (start: string, options: Options): DateCalculation => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));

  if (new Date(start).getTime() >= new Date('2026-01-01').getTime()) {
    const epidosiDays = getEpidosiDays(start, options?.exoterikou);
    const epidosi = getDateInfo(start, epidosiDays, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
        ...barbaraGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
        ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
        ...argiesDimosiou,
      ]),
    });
    const epidosiDate = epidosi.date.toISOString().split('T')[0];
    const days = options?.exoterikou ? 100 : 70;
    const paremvasiProsek = getDateInfo(epidosiDate, days, {
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

    return {
      date: paremvasiProsek.date.toISOString().split('T')[0],
      paused: [...epidosi.paused, ...paremvasiProsek.paused],
      skipped: [...epidosi.skipped, ...paremvasiProsek.skipped],
      logic: {
        days: days,
        when: 'after',
        reference: DeadlineType.EPIDOSI,
        start: epidosiDate,
        name: getDeadlineNameShort(DeadlineType.EPIDOSI),
      },
    };
  }

  let days = options?.exoterikou ? 120 : 90;
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
    logic: {
      days: days,
      when: 'after',
      reference: DeadlineType.KATATHESI,
      start: start,
      name: getDeadlineNameShort(DeadlineType.KATATHESI),
    },
  };
};
