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
import { getOpsigeneiAntikrousisAddedDays } from './getOpsigeneisAntikrousiAddedDays';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getOpsigeneisAntikrousiDetails = (
  start: string,
  prothesmia: string,
  options: Options
) => {
  if (start === undefined) {
    return undefined;
  } else {
    let topiki = options?.topiki ?? 'Αθηνών';
    const filtered = [
      ...legalAnalysis,
      ...barbaraLegalAnalysis,
      ...danielLegalAnalysis,
    ].filter(
      r =>
        checkIfIncluded(topiki, r.periohes) &&
        (r.eidos.includes('opsigeneis_antikrousi') || r.eidos.includes('all'))
    );
    let text: {
      nomothesia: string[];
      ypologismos: string[];
      imeres: string[];
    } = { nomothesia: [], ypologismos: [], imeres: [] };
    text.nomothesia = [
      `Αρθ.237 § 5 ΚΠολΔ. Ισχυρισμοί που γεννήθηκαν μετά την παρέλευση της προθεσμίας για την κατάθεση των προτάσεων και της προθεσμίας αντίκρουσης ή αποδεικνύονται εγγράφως ή με δικαστική ομολογία του αντιδίκου μπορούν να προταθούν με προσθήκη στις προτάσεις το αργότερο είκοσι (20) ημέρες πριν από την ορισθείσα συζήτηση. Το πρώτο εδάφιο εφαρμόζεται και στις περιπτώσεις των άρθρων 249 και 250. Η αντίκρουση γίνεται το αργότερο δέκα (10) ημέρες πριν από την ορισθείσα συζήτηση. Στην ίδια προθεσμία του πρώτου εδαφίου της παρούσας παραγράφου ο Πρόεδρος του Πολυμελούς Πρωτοδικείου, ο δικαστής του Μονομελούς Πρωτοδικείου ή ο ειρηνοδίκης μπορούν, ύστερα από αίτηση των διαδίκων που υποβάλλεται με την αγωγή ή και αυτοτελώς πριν από την ορισμένη δικάσιμο, να καλέσουν εγγράφως τους διαδίκους ή τους νομίμους αντιπροσώπους τους να εμφανιστούν αυτοπροσώπως κατά τη συζήτηση για να τους υποβληθούν ερωτήσεις και να δώσουν διασαφήσεις για την υπόθεση.`,
    ];

    filtered.forEach(r => {
      if (
        (!earlierThan(start, r.dates_start) &&
          laterThan(r.dates_start, prothesmia)) ||
        (!earlierThan(start, r.dates_end) &&
          !laterThan(prothesmia, r.dates_end))
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
    const addedDaysText = getOpsigeneiAntikrousisAddedDays(start, options);
    text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
    text.imeres = addedDaysText.imeres;

    return text;
  }
};
