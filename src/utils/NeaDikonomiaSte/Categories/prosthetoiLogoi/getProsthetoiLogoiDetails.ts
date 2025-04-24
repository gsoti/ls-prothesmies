// import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getProsthetoiLogoiAddedDays } from './getProsthetoiLogoiAddedDays';

export const getProsthetoiLogoiDetails = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `ΠΔ 18/1989 - Αρθ.25 § 1. Επιτρέπεται η υποβολή πρόσθετων λόγων ακύρωσης ή προσφυγής με δικόγραφο που κατατίθεται σύμφωνα με την παρ. 1 του άρθρου 19 και επιδίδεται με επιμέλεια του διαδίκου, επί ποινή απαραδέκτου, εντός είκοσι (20) ημερών από τη λήξη της τρίμηνης προθεσμίας για την αποστολή του φακέλου της υπόθεσης σύμφωνα με την παρ. 2 του άρθρου 23 και σε περίπτωση άσκησης ενδίκων μέσων εντός είκοσι (20) ημερών από την παρέλευση τριμήνου, το οποίο αρχίζει από την επίδοση του ενδίκου μέσου σύμφωνα με την περ. α΄ της παρ. 1 του άρθρου 21.`,
  ];

  const addedDaysText = getProsthetoiLogoiAddedDays(start);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
