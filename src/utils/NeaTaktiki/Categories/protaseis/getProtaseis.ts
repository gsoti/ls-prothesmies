import { getDate } from '../../../CalculateDates/calculateDate';
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
  checkIfIncluded,
  getAnastolesAnaDikastirio,
  normalizePeriohesWithExceptions,
} from '../../../Dikastiria/dikastiria';
import { barbaraCheckIfIncludedSingle } from '../../Anastoles/prosthikiHmeronBarbara2023';
import { getEpidosiDays } from '../epidosi/getEpidosiDays';

// interface Options {
//   dimosio?: boolean;
// }
export const getProtaseis = (start: string, options: Options): string => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));
  if (new Date(start).getTime() >= new Date('2022-01-01').getTime()) {
    if (options.klisi === false) {
      let epidosiDays = getEpidosiDays(start, options?.exoterikou);

      let epidosi = getDate(start, epidosiDays, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
          ...barbaraGetAnastolesAnaDikastirio(
            topiki,
            'epidosi',
            options?.yliki
          ),
          ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
          ...argiesDimosiou,
        ]),
      });
      let days = options?.exoterikou ? 120 : 90;

      let protaseis = getDate(epidosi.toISOString().split('T')[0], days, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'protaseis', options?.yliki),
          ...argiesDimosiou,
        ]),
      });

      if (
        (protaseis.toISOString().split('T')[0] === '2023-02-06' ||
          protaseis.toISOString().split('T')[0] === '2023-02-07') &&
        barbaraCheckIfIncludedSingle(topiki)
      ) {
        return '2023-02-13';
      }
      if (
        (protaseis.toISOString().split('T')[0] === '2023-02-08' ||
          protaseis.toISOString().split('T')[0] === '2023-02-09') &&
        barbaraCheckIfIncludedSingle(topiki)
      ) {
        return '2023-02-14';
      }

      protaseis = getDate(epidosi.toISOString().split('T')[0], days, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'protaseis', options?.yliki),
          ...barbaraGetAnastolesAnaDikastirio(
            topiki,
            'protaseis',
            options?.yliki
          ),
          ...danielGetAnastolesAnaDikastirio(
            topiki,
            'protaseis',
            options?.yliki
          ),
          ...argiesDimosiou,
        ]),
      });

      return protaseis.toISOString().split('T')[0];
    } else {
      let days = options?.exoterikou ? 120 : 90;

      let protaseis = getDate(start, days, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'protaseis', options?.yliki),
          ...argiesDimosiou,
        ]),
      });
      if (
        (protaseis.toISOString().split('T')[0] === '2023-02-06' ||
          protaseis.toISOString().split('T')[0] === '2023-02-07') &&
        barbaraCheckIfIncludedSingle(topiki)
      ) {
        return '2023-02-13';
      }
      if (
        (protaseis.toISOString().split('T')[0] === '2023-02-08' ||
          protaseis.toISOString().split('T')[0] === '2023-02-09') &&
        barbaraCheckIfIncludedSingle(topiki)
      ) {
        return '2023-02-14';
      }

      protaseis = getDate(start, days, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'protaseis', options?.yliki),
          ...barbaraGetAnastolesAnaDikastirio(
            topiki,
            'protaseis',
            options?.yliki
          ),
          ...argiesDimosiou,
        ]),
      });

      return protaseis.toISOString().split('T')[0];
    }
  } else {
    let topiki = options?.topiki ?? 'Αθηνών';
    let days = options?.exoterikou ? 130 : 100;

    let protaseis = getDate(start, days, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'protaseis', options?.yliki),
        ...argiesDimosiou,
      ]),
    });

    if (
      new Date('2021-03-21') <= new Date(protaseis) &&
      new Date('2021-03-26') >= new Date(protaseis) &&
      checkIfIncludedSingle(topiki)
    ) {
      protaseis.setDate(protaseis.getDate() + 8);
    }

    let new_protaseis = getDate(start, days, {
      argies: ['2022-01-22', '2022-01-23'],
      anastoli: [],
    });

    if (
      new Date('2022-01-24') <= new Date(new_protaseis) &&
      new Date('2022-01-29') >= new Date(new_protaseis) &&
      checkIfIncluded(
        topiki,
        normalizePeriohesWithExceptions(
          [
            'Πειραιά',
            'Αθηνών',
            'Ρόδου',
            'Ηρακλείου',
            'Λιβαδειάς',
            'Θηβών',
            'Χαλκίδας',
            'Νάξου',
            'Κω',
            'Ρεθύμνης',
            'Σύρου',
            'Χανίων',
            'Λασιθίου',
          ],
          []
        )
      )
    ) {
      protaseis = getDate(
        new Date('2022-01-30').toUTCString(),
        Math.ceil(
          Math.abs(
            ((new_protaseis as unknown) as number) -
              ((new Date('2022-01-24') as unknown) as number)
          ) /
            (1000 * 60 * 60 * 24)
        ) + 7,
        {
          argies: addArgAndAnastDays(argiesFunc(), [
            '2021-05-04',
            '2022-05-02',
          ]),
          anastoli: anastoliFunc(),
        }
      );
    }

    return protaseis.toISOString().split('T')[0];
  }
};
