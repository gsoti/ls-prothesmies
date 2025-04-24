import { analyseArgies } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { reverseDate } from '../../../Various/reverseDate';

export const getOloklirosiAddedDays = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };

  text.imeres.push(
    '40 ημέρες από την επομένη της λήξης της προθεσμίας για την υποχρεωτική αρχική συνεδρία διαμεσολάβησης.'
  );

  let argiesDimosiou: string[] = [];
  let days = 40;

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
