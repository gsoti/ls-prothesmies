import { analyseArgies, getDate } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import { checkIfIncludedSingle } from '../../Anastoles/prosthikiHmeron2021';
import { earlierThan } from '../../../Various/checkEarlierOrLaterDate';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  checkIfIncluded,
  getAnastolesAnaDikastirio,
  normalizePeriohesWithExceptions,
} from '../../../Dikastiria/dikastiria';
import { reverseDate } from '../../../Various/reverseDate';
import { barbaraCheckIfIncludedSingle } from '../../Anastoles/prosthikiHmeronBarbara2023';
import {
  danielCheckIfIncludedSingle,
  danielCheckIfIncludedSingle2,
} from '../../Anastoles/prosthikiHmeronDaniel2023';

export const getProsthikiAddedDays = (
  protaseisDate: string,
  options: Options
) => {
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
  text.imeres.push(`Eντός 15 ημερών από την κατάθεση προτάσεων.`);

  const year = parseInt(protaseisDate.slice(0, 4));
  if (earlierThan('2021-03-26', protaseisDate)) {
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
      text.imeres.push(
        `Προστέθηκαν επιπλέον 7 ημέρες επειδή η τελική ημερομηνία είναι από 22-3-2021 έως 26-3-2021 βάσει της παρ. 3α εδ. βα' του πεδίου 4 του ΦΕΚ 1076/Β/20-03-2021`
      );
    }
    const argia = analyseArgies(protaseisDate, 15, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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
  }
  if (earlierThan('2022-02-22', protaseisDate)) {
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
      text.ypologismos.push(
        `Προστέθηκαν επιπλέον 7 ημέρες ημέρες επειδή η τελική ημερομηνία είναι από 24-01-2022 έως 29-01-2022 βάσει της παρ. 3 του άρθρου 8 της από 29.1.2022 ΠΝΠ (ΦΕΚ Α΄14/29.1.2022)`
      );
    }
    const argia = analyseArgies(protaseisDate, 15, {
      argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
      anastoli: addArgAndAnastDays(anastoliFunc(year), [
        ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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
    let prosthiki = getDate(protaseisDate, 15, {
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
      let argia = analyseArgies(protaseisDate, 15, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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

      text.ypologismos.push(
        `H ${reverseDate(
          prosthiki.toISOString().split('T')[0]
        )} δεν υπολογίζεται στις προθεσμίες των άρθρων 237 και 238 ΚΠολΔ. Παρατείνεται και λήγει την Δευτέρα 13 Φεβρουαρίου 2023.(ΦΕΚ 598/Β/07.02.2023)`
      );
    }
    if (
      (prosthiki.toISOString().split('T')[0] === '2023-02-08' ||
        prosthiki.toISOString().split('T')[0] === '2023-02-09') &&
      barbaraCheckIfIncludedSingle(topiki)
    ) {
      let argia = analyseArgies(protaseisDate, 15, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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

      text.ypologismos.push(
        `H ${reverseDate(
          prosthiki.toISOString().split('T')[0]
        )} δεν υπολογίζεται στις προθεσμίες των άρθρων 237 και 238 ΚΠολΔ. Παρατείνεται και λήγει την Τρίτη 14 Φεβρουαρίου 2023.(ΦΕΚ 598/Β/07.02.2023)`
      );
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
      let argia = analyseArgies(protaseisDate, 15, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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

      text.ypologismos.push(
        `H ${reverseDate(
          prosthiki.toISOString().split('T')[0]
        )} δεν υπολογίζεται στις προθεσμίες των άρθρων 237 και 238 ΚΠολΔ. Παρατείνεται και λήγει την Τρίτη 19 Σεπτεμβρίου 2023.(ΦΕΚ  B’ 5384/09.09.2023)`
      );
    }
    if (
      (prosthiki.toISOString().split('T')[0] === '2023-09-09' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-10' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-11' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-12' ||
        prosthiki.toISOString().split('T')[0] === '2023-09-13') &&
      danielCheckIfIncludedSingle2(topiki)
    ) {
      let argia = analyseArgies(protaseisDate, 15, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
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

      text.ypologismos.push(
        `H ${reverseDate(
          prosthiki.toISOString().split('T')[0]
        )} δεν υπολογίζεται στις προθεσμίες των άρθρων 237 και 238 ΚΠολΔ. Παρατείνεται και λήγει την Τρίτη 19 Σεπτεμβρίου 2023.(ΦΕΚ  B’ 5385/09.09.2023)`
      );
    } else {
      let argia = analyseArgies(protaseisDate, 15, {
        argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(year), [
          ...getAnastolesAnaDikastirio(topiki, 'prosthiki', options?.yliki),
          ...barbaraGetAnastolesAnaDikastirio(
            topiki,
            'prosthiki',
            options?.yliki
          ),
          ...danielGetAnastolesAnaDikastirio(
            topiki,
            'prosthiki',
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
    }
    return text;
  }
};
