import { CalculatedDate, getDateReverseCalculation } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  getAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';

// interface Options {
//   dimosio?: boolean;
// }
export const getAntikrousiOpsig = (start: string, options: Options): string => {
  return getAntikrousiOpsigCalculation(start, options).date;
}

export const getAntikrousiOpsigCalculation = (start: string, options: Options): CalculatedDate => {
  let argiesDimosiou: string[] = [];
  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));
  let days = 10;
  let epidosi = getDateReverseCalculation(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(topiki, 'antikrousi', options?.yliki),
      ...barbaraGetAnastolesAnaDikastirio(topiki, 'antikrousi', options?.yliki),
      ...danielGetAnastolesAnaDikastirio(topiki, 'epidosi', options?.yliki),
      ...argiesDimosiou,
    ]),
  });

  if (
    new Date('2021-03-21') <= new Date(epidosi.date) &&
    new Date('2021-03-26') >= new Date(epidosi.date) &&
    [
      'Πειραιά',
      'Αθηνών',
      'Θεσσαλονίκης',
      'Ρόδου',
      'Ηρακλείου',
      'Λιβαδειάς',
      'Θηβών',
      'Χαλκίδας',
      'Σάμου',

      'Νάξου',
      'Κω',
      'Ρεθύμνης',
      'Σύρου',

      'Κατερίνης',
      'Χαλκιδικής',
      'Ευρυτανίας',
      'Μυτιλήνης',

      'Χίου',
      'Άρτας',
      'Θεσπρωτίας',
      'Λαμίας',
      'Άμφισσας',
      'Ναυπλίου',
      'Κορίνθου',
      'Αγρινίου',
      'Λευκάδας',
      'Μεσολογίου',
      'Σάμου',
    ].includes(topiki)
  ) {
    epidosi.date.setDate(epidosi.date.getDate() + 8);
  }
  return {
    date: epidosi.date.toISOString().split('T')[0],
    paused: epidosi.paused,
    skipped: epidosi.skipped,
    days: days
  }
};
