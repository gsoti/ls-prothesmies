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
import { getProsthikiAddedDays } from './getProsthikiAddedDays';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getProsthikiDetails = (
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
      (r.eidos.includes('prosthiki') || r.eidos.includes('all'))
  );
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Αρθ.237 § 2 ΚΠολΔ. Οι αμοιβαίες αντικρούσεις γίνονται με προσθήκη στις προτάσεις, η οποία κατατίθεται μέσα στις επόμενες δεκαπέντε (15) ημέρες από τη λήξη της παραπάνω προθεσμίας, με την παρέλευση των οποίων κλείνει ο φάκελος της δικογραφίας. Νέοι ισχυρισμοί με την προσθήκη μπορεί να προταθούν και νέα αποδεικτικά μέσα να προ-σκομισθούν μόνο για την αντίκρουση ισχυρισμών που περιέχονται στις προτάσεις. Εκπρόθεσμες προτάσεις και προσθήκες δεν λαμβάνονται υπόψη.\nΑρθ.237 § 7 ΚΠολΔ. Μέσα σε οκτώ (8) εργάσιμες ημέρες από την εξέταση των μαρτύρων οι διάδικοι δικαιούνται με προσθήκη να προβούν σε αξιολόγηση των αποδείξεων αυτών. Νέοι ισχυρισμοί και νέα αποδεικτικά μέσα δεν λαμβάνονται υπόψη και δεν κατατίθενται νέες προτάσεις.`,
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
  const addedDaysText = getProsthikiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
