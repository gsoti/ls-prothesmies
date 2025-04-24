import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';
import { reverseDate } from '../../../Various/reverseDate';
import { analyseArgies } from '../../../CalculateDates/calculateDate';

export const getSynedriaAddedDays = (start: string, options?: Options) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };

  text.imeres.push(
    '20 ημέρες από την επομένη της αποστολής στον διαμεσολαβητή του αιτήματος προσφυγής στη διαδικασία διαμεσολάβησης από το επισπεύδον μέρος ή 30 ημέρες εάν κάποιο από τα μέρη διαμένει στο εξωτερικό'
  );

  let argiesDimosiou: string[] = [];
  let days = options?.exoterikou ? 30 : 20;

  const year = parseInt(start.slice(0, 4));

  const argia = analyseArgies(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });
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
