import { Options } from '../../Types/interfaces';
import {
  barbaraLegalAnalysis,
  danielLegalAnalysis,
  legalAnalysis,
} from '../../../LegalAnalysis/legalAnalysis';
import {
  checkIfAnastoliDiakopon,
  earlierThan,
  laterThan,
} from '../../../Various/checkEarlierOrLaterDate';
import { getParemvasiAddedDays } from './getParemvasiAddedDays';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getParemvasiDetails = (
  start: string,
  prothesmia: string,
  options: Options
) => {
  let topiki = options?.topiki ?? 'Αθηνών';
  const filtered = [
    ...legalAnalysis,
    ...barbaraLegalAnalysis,
    ...danielLegalAnalysis,
  ].filter(
    r =>
      checkIfIncluded(topiki, r.periohes) &&
      (r.eidos.includes('paremvasi') || r.eidos.includes('all'))
  );
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Αρθ. 238 § 1 ΚΠολΔ Παρεμβάσεις, προσεπικλήσεις, ανακοινώσεις και ανταγωγές στην περίπτωση του άρθρου 237 κατατίθενται και επιδίδονται σε όλους τους διαδίκους μέσα σε εξήντα (60) ημέρες από την κατάθεση της αγωγής. Παρεμβάσεις μετά από προσεπίκληση ή ανακοίνωση κατατίθενται και επιδίδονται σε όλους τους διαδίκους, μέσα σε ενενήντα (90) ημέρες από την κατάθεση της αγωγής. Οι παραπάνω προθεσμίες παρατείνονται κατά τριάντα (30) ημέρες για όλους τους διάδικους αν ο αρχικός εναγόμενος ή κάποιος από τους ομοδίκους του διαμένει στο εξωτερικό ή είναι άγνωστης διαμονής. Η κατάθεση των προτάσεων και της προσθήκης σε αυτές, γίνεται και στην τελευταία περίπτωση μέσα στις προθεσμίες των παραγράφων 1 και 2 του άρθρου 237.\nΑρθ. 237 § 2 ΚΠολΔ. Οι αμοιβαίες αντικρούσεις γίνονται με προσθήκη στις προτάσεις, η οποία κατατίθεται μέσα στις επόμενες δεκαπέντε (15) ημέρες από τη λήξη της παραπάνω προθεσμίας, με την παρέλευση των οποίων κλείνει ο φάκελος της δικογραφίας. Νέοι ισχυρισμοί με την προσθήκη μπορεί να προταθούν και νέα αποδεικτικά μέσα να προ-σκομισθούν μόνο για την αντίκρουση ισχυρισμών που περιέχονται στις προτάσεις. Εκπρόθεσμες προτάσεις και προσθήκες δεν λαμβάνονται υπόψη.`,
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
      options.dimosio ? options.dimosio : false
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
