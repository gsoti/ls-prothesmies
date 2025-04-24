import { Options } from '../../Types/interfaces';
import { getParemvasiAddedDays } from './getParemvasiAddedDays';
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

export const getParemvasiDetails = (
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
  text.nomothesia = [
    `Αρθ.468 § 3 ΚΠολΔ. Παρεμβάσεις και ανταγωγές κατατίθενται και επιδίδονται στους διαδίκους μέσα σε προθεσμία είκοσι (20) ημερών από την κατάθεση της αγωγής. Η προθεσμία αυτή παρατείνεται κατά είκοσι (20) ημέρες αν ο εναγόμενος διαμένει στο εξωτερικό ή είναι άγνωστης διαμονής. Η προσκομιδή των αποδεικτικών μέσων και το έγγραφο υπόμνημα των ισχυρισμών στις περιπτώσεις του δεύτερου εδαφίου γίνονται σε προθεσμία τριάντα (30) ή πενήντα (50) ημερών, αντίστοιχα, από την κατάθεση της αγωγής και η έγγραφη προσθήκη αντίκρουση στην προθεσμία του τρίτου εδαφίου της παρ. 2.`,
  ];
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
  const addedDaysText = getParemvasiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
