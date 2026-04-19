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
export const getParemvasiCalculation = (start: string, options: Options): DateCalculation => {
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
    const days = options?.exoterikou ? 70 : 40;
    const paremvasi = getDateInfo(epidosiDate, days, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
        ...barbaraGetAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
        ...danielGetAnastolesAnaDikastirio(topiki, 'paremvasi', options?.yliki),
        ...argiesDimosiou,
      ]),
    });

    return {
      date: paremvasi.date.toISOString().split('T')[0],
      paused: [...epidosi.paused, ...paremvasi.paused],
      skipped: [...epidosi.skipped, ...paremvasi.skipped],
      logic: {
        days: days,
        when: 'after',
        reference: DeadlineType.EPIDOSI,
        start: epidosiDate,
        name: getDeadlineNameShort(DeadlineType.EPIDOSI),
      },
    };
  }

  let days = options?.exoterikou ? 90 : 60;
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
    logic: {
      days: days,
      when: 'after',
      reference: DeadlineType.KATATHESI,
      start: start,
      name: getDeadlineNameShort(DeadlineType.KATATHESI),
    },
  };
};
