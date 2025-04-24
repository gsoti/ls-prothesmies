import { addMonths } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
// import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
// import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';

// interface Options {
//   dimosio?: boolean;
// }
export const getEpidosi = (start: string): string => {
  const year = parseInt(start.slice(0, 4));

  let argiesDimosiou: string[] = anastoliDimosiouFunc(year);
  let months = 2;
  let lixi = addMonths(start, months, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });

  return lixi.correctDate.toISOString().split('T')[0];
};
