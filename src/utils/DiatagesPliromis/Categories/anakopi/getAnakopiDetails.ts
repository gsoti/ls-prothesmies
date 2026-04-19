import { Options } from '../../Types/interfaces';
import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getAnakopiAddedDays } from './getAnakopiAddedDays';

export const getAnakopiDetails = (
  epidosi: string,
  prothesmia: string,
  options?: Options
) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  if (new Date(epidosi).getTime() >= new Date('2026-01-01').getTime()) {
    text.nomothesia = [
      `Αρθ. 632 παρ. 2 ΚΠολΔ (Ν. 5221/2025). Η προθεσμία για την άσκηση της ανακοπής είναι δεκαπέντε (15) εργάσιμες ημέρες αν η διαταγή πληρωμής έχει εκδοθεί κατά προσώπου που έχει την διαμονή ή την έδρα του στην Ελλάδα και τριάντα (30) εργάσιμες ημέρες αν η διαταγή πληρωμής έχει εκδοθεί κατά προσώπου που έχει τη διαμονή ή την έδρα του στο εξωτερικό ή η διαμονή του είναι άγνωστη.\nΑρθ. 633 § 2Α ΚΠολΔ (νέο, Ν. 5221/2025). Η άσκηση ανακοπής δεν αναστέλλει την εκτέλεση της διαταγής πληρωμής. Το δικαστήριο δύναται να χορηγήσει αναστολή κατά τα αρ. 686 επ. ΚΠολΔ. Βλ. Ν. 5221/2025 (Α' 133/28-7-2025).`,
    ];
  } else {
    text.nomothesia = [
      `Αρθ.632 παρ. 2 ΚΠολΔ. Η προθεσμία για την άσκηση της ανακοπής είναι δεκαπέντε (15) εργάσιμες ημέρες αν η διαταγή πληρωμής έχει εκδοθεί κατά προσώπου που έχει την διαμονή ή την έδρα του στην Ελλάδα και τριάντα (30) εργάσιμες ημέρες αν η διαταγή πληρωμής έχει εκδοθεί κατά προσώπου που έχει τη διαμονή ή την έδρα του στο εξωτερικό ή η διαμονή του είναι άγνωστη.`,
    ];
  }
  if (options?.dimosio) {
    text.nomothesia.push(
      "Αν το καθ'ου η διαταγή πληρωμής είναι το Δημόσιο, εφαρμόζεται το άρθρο 10 του Κώδικα των νόμων περί δικών του Δημοσίου, το οποίο ισχύει και μετά την εισαγωγή του ΚΠολΔ, και η προθεσμία ανακοπής είναι 30 ημέρες σε κάθε περίπτωση.\nΣύμφωνα με το άρθρο 11 του Κώδικα των νόμων περί δικών του Δημοσίου, η προθεσμία αυτή αναστέλλεται σε όλη τη διάρκεια των δικαστικών διακοπών δηλαδή από 1η Ιουλίου έως 15η Σεπτεμβρίου."
    );
  }

  if (
    checkIfAnastoliDiakopon(
      epidosi,
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
  const addedDaysText = getAnakopiAddedDays(epidosi, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
