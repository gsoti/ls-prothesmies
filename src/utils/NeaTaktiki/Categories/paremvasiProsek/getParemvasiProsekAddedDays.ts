import { analyseArgies, getDate } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import { checkIfIncludedSingle } from '../../Anastoles/prosthikiHmeron2021';
import { earlierThan } from '../../../Various/checkEarlierOrLaterDate';
import { reverseDate } from '../../../Various/reverseDate';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  getAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';

export const getParemvasiProsekAddedDays = (
  start: string,
  options: Options
) => {
  if (earlierThan('2021-03-26', start)) {
    let text: {
      nomothesia: string[];
      ypologismos: string[];
      imeres: string[];
    } = { nomothesia: [], ypologismos: [], imeres: [] };
    let argiesDimosiou: string[] = [];
    let days = options?.exoterikou ? 120 : 90;

    if (options?.dimosio) {
      argiesDimosiou = anastoliDimosiouFunc();
    }
    let topiki = options?.topiki ?? 'Αθηνών';
    text.imeres.push(
      `${days} ημέρες από το τέλος της προθεσμίας για επίδοση της αγωγής.`
    );

    const year = parseInt(start.slice(0, 4));

    let paremvasi_prosek = getDate(start, days, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...barbaraGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...danielGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...argiesDimosiou,
      ]),
    });

    if (
      new Date('2021-03-21') <= new Date(paremvasi_prosek) &&
      new Date('2021-03-26') >= new Date(paremvasi_prosek) &&
      checkIfIncludedSingle(topiki)
    ) {
      text.ypologismos.push(
        `Προστέθηκαν επιπλέον 7 ημέρες επειδή η τελική ημερομηνία είναι από 22-3-2021 έως 26-3-2021 βάσει της παρ. 3α εδ. βα' του πεδίου 4 του ΦΕΚ 1076/Β/20-03-2021`
      );
    }
    const argia = analyseArgies(start, days, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...barbaraGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...danielGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...argiesDimosiou,
      ]),
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
  } else {
    let text: {
      nomothesia: string[];
      ypologismos: string[];
      imeres: string[];
    } = { nomothesia: [], ypologismos: [], imeres: [] };
    let argiesDimosiou: string[] = [];

    if (options?.dimosio) {
      argiesDimosiou = anastoliDimosiouFunc();
    }
    let topiki = options?.topiki ?? 'Αθηνών';

    const year = parseInt(start.slice(0, 4));
    let days = options?.exoterikou ? 120 : 90;

    const argia = analyseArgies(start, days, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...barbaraGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...danielGetAnastolesAnaDikastirio(
          topiki,
          'paremvasi_prosek',
          options?.yliki
        ),
        ...argiesDimosiou,
      ]),
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

    text.imeres.push(
      `${days} ημέρες από το τέλος της προθεσμίας για επίδοση της αγωγής.`
    );
    return text;
  }
};
