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
import { getOpsigeneisAddedDays } from './getOpsigeneisAddedDays';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getOpsigeneisDetails = (
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
        (r.eidos.includes('opsigeneis') || r.eidos.includes('all'))
    );
    let text: {
      nomothesia: string[];
      ypologismos: string[];
      imeres: string[];
    } = { nomothesia: [], ypologismos: [], imeres: [] };
    text.nomothesia = [
      `Αρθ.237 § 5 ΚΠολΔ. Ισχυρισμοί που γεννήθηκαν μετά την παρέλευση της προθεσμίας για την κατάθεση των προτάσεων και της προθεσμίας αντίκρουσης ή αποδεικνύονται εγγράφως ή με δικαστική ομολογία του αντιδίκου μπορούν να προταθούν με προσθήκη στις προτάσεις το αργότερο είκοσι (20) ημέρες πριν από την ορισθείσα συζήτηση. Το πρώτο εδάφιο εφαρμόζεται και στις περιπτώσεις των άρθρων 249 και 250. Η αντίκρουση γίνεται το αργότερο δέκα (10) ημέρες πριν από την ορισθείσα συζήτηση. Στην ίδια προθεσμία του πρώτου εδαφίου της παρούσας παραγράφου ο Πρόεδρος του Πολυμελούς Πρωτοδικείου, ο δικαστής του Μονομελούς Πρωτοδικείου ή ο ειρηνοδίκης μπορούν, ύστερα από αίτηση των διαδίκων που υποβάλλεται με την αγωγή ή και αυτοτελώς πριν από την ορισμένη δικάσιμο, να καλέσουν εγγράφως τους διαδίκους ή τους νομίμους αντιπροσώπους τους να εμφανιστούν αυτοπροσώπως κατά τη συζήτηση για να τους υποβληθούν ερωτήσεις και να δώσουν διασαφήσεις για την υπόθεση.
    Αρθ.249 ΚΠολΔ. Αν η διάγνωση της διαφοράς εξαρτάται ολικά ή εν μέρει από την ύπαρξη ή ανυπαρξία μιας έννομης σχέσης ή την ακυρότητα ή τη διάρρηξη μιας δικαιοπραξίας που συνιστά αντικείμενο άλλης δίκης εκκρεμούς σε πολιτικό ή διοικητικό δικαστήριο ή από ζήτημα που πρόκειται να κριθεί ή κρίνεται από διοικητική αρχή, το δικαστήριο μπορεί αυτεπαγγέλτως ή ύστερα από αίτηση κάποιου διαδίκου να διατάξει την Αναβολή της Συζήτησης εωσότου περατωθεί τελεσίδικα ή αμετάκλητα η άλλη δίκη ή εωσότου εκδοθεί από τη διοικητική αρχή απόφαση που δεν θα μπορεί να προσβληθεί. Αν η διοικητική αρχή δεν έχει ακόμη ασχοληθεί με την υπόθεση, το δικαστήριο ορίζει προθεσμία, μέσα στην οποία ο διάδικος οφείλει να προκαλέσει με αίτηση την ενέργεια της αρχής.
    Αρθ.250 ΚΠολΔ. Αν είναι εκκρεμής ποινική αγωγή που επηρεάζει τη διάγνωση της διαφοράς, το δικαστήριο μπορεί, αυτεπαγγέλτως ή ύστερα από αίτηση κάποιου διαδίκου, να διατάξει την Αναβολή της Συζήτησης εωσότου περατωθεί αμετάκλητα η ποινική διαδικασία.`,
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
    const addedDaysText = getOpsigeneisAddedDays(start, options);
    text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
    text.imeres = addedDaysText.imeres;

    return text;
  }
};
