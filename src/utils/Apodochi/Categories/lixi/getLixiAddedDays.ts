import { addMonths } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
// import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import { reverseDate } from '../../../Various/reverseDate';

export const getEpidosiAddedDays = (start: string, options?: Options) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  const diastima = options?.exoterikou
    ? 'Ένας χρόνος από από τον θάνατο του κληρονομούμενου ή από την ημερομηνία δημοσίευσης της διαθήκης.'
    : '4 μήνες από από τον θάνατο του κληρονομούμενου ή από την ημερομηνία δημοσίευσης της διαθήκης.';
  text.imeres.push(diastima);
  let months = options?.exoterikou ? 12 : 4;

  let argiesDimosiou: string[] = [];

  const year = parseInt(start.slice(0, 4));

  const argia = addMonths(start, months, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  }).firstArgia;
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
