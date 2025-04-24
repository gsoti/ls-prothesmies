import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getOloklirosiAddedDays } from './getOloklirosiAddedDays';

export const getOloklirosiDetails = (start: string, prothesmia: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Άρθρο 7 παρ. 7 του Ν. 4640/2019: Εφόσον τα μέρη αποφασίσουν να συνεχίσουν τη διαδικασία της διαμεσολάβησης είτε με τον ίδιο είτε με διαφορετικό διαμεσολαβητή, συντάσσεται έγγραφο συμφωνίας υπαγωγής της διαφοράς στη διαδικασία της διαμεσολάβησης και ακολουθείται η διαδικασία του άρθρου 5 του παρόντος, η οποία θα πρέπει να έχει ολοκληρωθεί εντός σαράντα (40) ημερών, που υπολογίζονται από την επομένη της λήξης της ανωτέρω εικοσαήμερης ή τριακονθήμερης προθεσμίας. Τα μέρη δύνανται να συμφωνούν παράταση της προθεσμίας των σαράντα (40) ημερών.\nΤο χρονικό διάστημα από 1 έως 31 Αυγούστου δεν υπολογίζεται στις παραπάνω προθεσμίες.`,
  ];

  if (checkIfAnastoliDiakopon(start, prothesmia)) {
    text.ypologismos.push(
      'Εξαιρέθηκε από τον υπολογισμό το διάστημα από 1η έως 31η Αυγούστου.'
    );
  }
  const addedDaysText = getOloklirosiAddedDays(start);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
