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
import {
  danielCheckIfIncludedSingle,
  danielCheckIfIncludedSingle2,
} from '../../Anastoles/prosthikiHmeronDaniel2023';

// interface Options {
//   dimosio?: boolean;
// }
export const getProsthiki = (
  protaseisDate: string,
  options: Options
): string => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(protaseisDate.slice(0, 4));

  let prosthiki = getDate(protaseisDate, 15, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
      ...argiesDimosiou,
    ]),
  });
  if (
    new Date('2021-03-21') <= new Date(prosthiki) &&
    new Date('2021-03-26') >= new Date(prosthiki) &&
    checkIfIncludedSingle(topiki)
  ) {
    prosthiki.setDate(prosthiki.getDate() + 8);
  }
  let new_prosthiki = getDate(protaseisDate, 15, {
    argies: ['2022-01-22', '2022-01-23'],
    anastoli: [],
  });

  if (
    new Date('2022-01-24') <= new Date(new_prosthiki) &&
    new Date('2022-01-29') >= new Date(new_prosthiki) &&
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
    prosthiki = getDate(
      new Date('2022-01-30').toUTCString(),
      Math.ceil(
        Math.abs(
          ((new_prosthiki as unknown) as number) -
            ((new Date('2022-01-24') as unknown) as number)
        ) /
          (1000 * 60 * 60 * 24)
      ) + 7,
      {
        argies: addArgAndAnastDays(argiesFunc(), ['2021-05-04', '2022-05-02']),
        anastoli: anastoliFunc(),
      }
    );
  }

  if (new Date(protaseisDate).getTime() >= new Date('2023-01-01').getTime()) {
    prosthiki = getDate(protaseisDate, 15, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
        ...argiesDimosiou,
      ]),
    });

    if (
      (prosthiki.toISOString().split('T')[0] === '2023-02-06' ||
        prosthiki.toISOString().split('T')[0] === '2023-02-07') &&
      barbaraCheckIfIncludedSingle(topiki)
    ) {
      return '2023-02-13';
    }
    if (
      (prosthiki.toISOString().split('T')[0] === '2023-02-08' ||
        prosthiki.toISOString().split('T')[0] === '2023-02-09') &&
      barbaraCheckIfIncludedSingle(topiki)
    ) {
      return '2023-02-14';
    }

    if (
      (prosthiki.toISOString().split('T')[0] === '2023-09-08' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-09' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-10' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-11' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-12' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-13') &&
      danielCheckIfIncludedSingle(topiki)
    ) {
      return '2023-09-19';
    }
    if (
      prosthiki.toISOString().split('T')[0] === '2023-09-09' ||
      prosthiki.toISOString().split('T')[0] === '2023-09-10' ||
      prosthiki.toISOString().split('T')[0] === '2023-09-11' ||
      prosthiki.toISOString().split('T')[0] === '2023-09-12' ||
      (prosthiki.toISOString().split('T')[0] === '2023-09-13' &&
        danielCheckIfIncludedSingle2(topiki))
    ) {
      return '2023-09-19';
    }
    prosthiki = getDate(protaseisDate, 15, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
        ...barbaraGetAnastolesAnaDikastirio(
          topiki,
          'prosthiki',
          options?.yliki
        ),
        ...danielGetAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
        ...argiesDimosiou,
      ]),
    });

    return prosthiki.toISOString().split('T')[0];
  }

  return prosthiki.toISOString().split('T')[0];
};
