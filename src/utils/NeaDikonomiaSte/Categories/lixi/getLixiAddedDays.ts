import { addMonths } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
// import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { reverseDate } from '../../../Various/reverseDate';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';

export const getEpidosiAddedDays = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  const diastima = 'Δύο (2) μήνες από την κατάθεση του εισαγωγικού δικογράφου.';
  text.imeres.push(diastima);
  let months = 2;
  const year = parseInt(start.slice(0, 4));

  let argiesDimosiou: string[] = anastoliDimosiouFunc(year);

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
