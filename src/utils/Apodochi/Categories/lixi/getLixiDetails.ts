import { Options } from '../../Types/interfaces';
// import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getEpidosiAddedDays } from './getLixiAddedDays';

export const getLixiDetails = (start: string, options?: Options) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Αρθ.1847 ΚΠολΔ. Ο κληρονόμος μπορεί να αποποιηθεί την κληρονομία μέσα σε προθεσμία τεσσάρων μηνών που αρχίζει από τότε που έμαθε την επαγωγή και το λόγο της. Στην επαγωγή από διαθήκη η προθεσμία δεν αρχίζει πριν από τη δημοσίευση της διαθήκης.Αν ο κληρονομούμενος είχε την τελευταία κατοικία του στο εξωτερικό ή αν ο κληρονόμος έμαθε την επαγωγή όταν διέμενε στο εξωτερικό, η προθεσμία είναι ενός έτους.Η προθεσμία αναστέλλεται από τους ίδιους λόγους που αναστέλλεται και η παραγραφή.`,
  ];

  const addedDaysText = getEpidosiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
