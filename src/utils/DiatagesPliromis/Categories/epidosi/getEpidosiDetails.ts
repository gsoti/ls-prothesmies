import { Options } from '../../Types/interfaces';
import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getEpidosiAddedDays } from './getEpidosiAddedDays';

export const getEpidosiDetails = (
  start: string,
  prothesmia: string,
  options?: Options
) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  if (new Date(start).getTime() >= new Date('2026-01-01').getTime()) {
    text.nomothesia = [
      `Αρθ. 630Α ΚΠολΔ (Ν. 5221/2025). Η διαταγή πληρωμής, η οποία εκδίδεται πλέον από δικηγόρο (Αρθ. 625-626 ΚΠολΔ νέο), επιδίδεται σε εκείνον κατά του οποίου στρέφεται μέσα σε προθεσμία δύο μηνών από την έκδοσή της. Αν η επίδοση δεν γίνει μέσα στην προθεσμία των δύο μηνών, η διαταγή πληρωμής παύει να ισχύει.\nΕφαρμόζεται αναλογικά η ΚΠολΔ 147 παρ. 2, επομένως η προθεσμία υπόκειται στην αναστολή από 1 έως 31 Αυγούστου. Βλ. Ν. 5221/2025 (Α' 133/28-7-2025), Αρθ. 126 § 5 — εφαρμόζεται σε αιτήσεις από 1/1/2026.`,
    ];
  } else {
    text.nomothesia = [
      `Αρθ.630Α ΚΠολΔ. Η διαταγή πληρωμής επιδίδεται σε εκείνον κατά του οποίου στρέφεται μέσα σε προθεσμία δύο μηνών από την έκδοσή της. Αν η επίδοση δεν γίνει μέσα στην προθεσμία των δύο μηνών, η διαταγή πληρωμής παύει να ισχύει.\nΕφαρμόζεται αναλογικά η ΚΠολΔ 147 παρ.2, επομένως η προθεσμία υπόκειται στην αναστολή από 1 έως 31 Αυγούστου.`,
    ];
  }
  if (options?.dimosio) {
    text.nomothesia.push(
      "Αν το καθ'ου η διαταγή πληρωμής είναι το Δημόσιο, εφαρμόζεται το άρθρο 10 του Κώδικα των νόμων περί δικών του Δημοσίου, το οποίο ισχύει και μετά την εισαγωγή του ΚΠολΔ, και η προθεσμία ανακοπής είναι 30 ημέρες σε κάθε περίπτωση.\nΣύμφωνα με το άρθρο 11 του Κώδικα των νόμων περί δικών του Δημοσίου, η προθεσμία αυτή αναστέλλεται σε όλη τη διάρκεια των δικαστικών διακοπών δηλαδή από 1η Ιουλίου έως 15η Σεπτεμβρίου."
    );
  }

  if (
    checkIfAnastoliDiakopon(
      start,
      prothesmia,
      options?.dimosio ? options.dimosio : false
    )
  ) {
    text.ypologismos.push(
      options?.dimosio
        ? 'Εξαιρέθηκε από τον υπολογισμό το διάστημα από 1η Ιουλίου έως 15 Σεπτεμβρίου λόγω δικαστικών διακοπών.'
        : 'Εξαιρέθηκε από τον υπολογισμό το διάστημα από 1η έως 31η Αυγούστου λόγω δικαστικών διακοπών.'
    );
  }
  const addedDaysText = getEpidosiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
