import { Options } from '../../Types/interfaces';
import { getEpidosiAddedDays } from './getEpidosiAddedDays';
import {
  barbaraLegalAnalysis,
  danielLegalAnalysis,
} from '../../../LegalAnalysis/legalAnalysis';
import {
  checkIfAnastoliDiakopon,
  earlierThan,
  laterThan,
} from '../../../Various/checkEarlierOrLaterDate';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getEpidosiDetails = (
  start: string,
  prothesmia: string,
  options?: Options
) => {
  let topiki = options?.topiki ?? 'Αθηνών';
  const filtered = [...barbaraLegalAnalysis, ...danielLegalAnalysis].filter(
    r =>
      checkIfIncluded(topiki, r.periohes) &&
      (r.eidos.includes('epidosi') || r.eidos.includes('all'))
  );
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  if (new Date(start).getTime() >= new Date('2026-01-01').getTime()) {
    text.nomothesia = [
      `Αρθ. 468 § 1 ΚΠολΔ (Ν. 5221/2025). Η αγωγή κατατίθεται στη γραμματεία του πρωτοδικείου και επιδίδεται στον εναγόμενο μέσα σε προθεσμία δέκα (10) ημερών από την κατάθεσή της. Το δεύτερο εδάφιο της παρ. 2 του άρθρου 215 εφαρμόζεται αναλόγως. Βλ. Αρθ. 468 § 1 ΚΠολΔ, όπως αντικαταστάθηκε με το Ν. 5221/2025 (Α' 133/28-7-2025). Ισχύει για αγωγές που κατατίθενται από 1/1/2026.`,
    ];
  } else {
    text.nomothesia = [
      `Αρθ.468 § 1 ΚΠολΔ. Η αγωγή κατατίθεται στη γραμματεία του ειρηνοδικείου και επιδίδεται στον εναγόμενο μέσα σε προθεσμία δέκα (10) ημερών από την κατάθεσή της. Αν ο εναγόμενος διαμένει στο εξωτερικό ή είναι άγνωστης διαμονής η αγωγή επιδίδεται σε προθεσμία τριάντα (30) ημερών από την κατάθεσή της. Το δεύτερο εδάφιο της παρ. 2 του άρθρου 215 εφαρμόζεται αναλόγως.`,
    ];
  }
  filtered.forEach(r => {
    if (
      (!earlierThan(start, r.dates_start) &&
        laterThan(r.dates_start, prothesmia)) ||
      (!earlierThan(start, r.dates_end) && !laterThan(prothesmia, r.dates_end))
    ) {
      if (text.ypologismos.length === 0) {
        text.ypologismos.push('Εξαιρέθηκαν οι ημερομηνίες:');
      }
      text.ypologismos.push(r.text);
    }
  });

  if (
    checkIfAnastoliDiakopon(
      start,
      prothesmia,
      options?.dimosio ? options.dimosio : false
    )
  ) {
    text.ypologismos.push(
      'Εξαιρέθηκαν οι ημερομηνίες της αναστολής λόγω δικαστικών διακοπών.'
    );
  }
  const addedDaysText = getEpidosiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
