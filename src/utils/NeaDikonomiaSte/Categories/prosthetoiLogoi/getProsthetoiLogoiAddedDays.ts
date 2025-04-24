import {
  addMonths,
  analyseArgies,
} from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
// import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { reverseDate } from '../../../Various/reverseDate';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';

export const getProsthetoiLogoiAddedDays = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  const diastima =
    'Είκοσι (20) μέρες από τη λήξη της τρίμηνης προθεσμίας για την αποστολή του φακέλου της υπόθεσης σύμφωνα με την παρ. 2 του άρθρου 23';
  text.imeres.push(diastima);
  let months = 3;
  const year = parseInt(start.slice(0, 4));
  let days = 20;

  let argiesDimosiou: string[] = anastoliDimosiouFunc(year);

  const lixi = addMonths(start, months, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });

  const argia = analyseArgies(
    lixi.correctDate.toISOString().split('T')[0],
    days,
    {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
    }
  );
  let dayOfWeek = '';
  if (new Date(argia).getDay() === 0) {
    dayOfWeek = ' (Κυριακή)';
  }
  if (new Date(argia).getDay() === 6) {
    dayOfWeek = ' (Σάββατο)';
  }
  if (argia) {
    text.ypologismos.push(
      `Επειδή η ${reverseDate(
        argia
      )} είναι αργία${dayOfWeek}, η ημερομήνια μετατέθηκε στην επομένη εργάσιμη.`
    );
  }

  return text;
};
