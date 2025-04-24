// import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getEpidosiAddedDays } from './getLixiAddedDays';

export const getLixiDetails = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `ΠΔ 18/1989 - Αρθ.21  § 1. α. Αντίγραφο του δικογράφου του ενδίκου βοηθήματος ή μέσου με μνεία της χρονολογίας κατάθεσης επιδίδεται, με επιμέλεια του διαδίκου που το ασκεί, στον διάδικο κατά του οποίου στρέφεται το εισαγωγικό δικόγραφο, σύμφωνα με τις κείμενες διατάξεις για τις επιδόσεις και με όσα ειδικότερα ορίζονται στο παρόν. Η επίδοση διενεργείται εντός δύο (2) μηνών από την κατάθεση του εισαγωγικού δικογράφου και τα αποδεικτικά επιδόσεως προσκομίζονται το ταχύτερο δυνατό και επισυνάπτονται στον φάκελο της δικογραφίας`,
  ];

  const addedDaysText = getEpidosiAddedDays(start);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
