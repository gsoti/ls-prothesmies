import { Options } from '../../Types/interfaces';
import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getSynedriaAddedDays } from './getSynedriaAddedDays';

export const getSynedriaDetails = (
  start: string,
  prothesmia: string,
  options?: Options
) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Άρθρο 7 παρ. 3 του Ν. 4640/2019: Η υποχρεωτική αρχική συνεδρία διαμεσολάβησης λαμβάνει χώρα το αργότερο εντός είκοσι (20) ημερών από την επομένη της αποστολής στον διαμεσολαβητή του αιτήματος προσφυγής στη διαδικασία διαμεσολάβησης από το επισπεύδον μέρος. Αν κάποιο από τα μέρη διαμένει στο εξωτερικό η ως άνω προθεσμία παρεκτείνεται έως την τριακοστή (30ή) ημέρα από την επομένη της αποστολής του αιτήματος στον διαμεσολαβητή.`,
  ];

  if (checkIfAnastoliDiakopon(start, prothesmia)) {
    text.ypologismos.push(
      'Εξαιρέθηκε από τον υπολογισμό το διάστημα από 1η έως 31η Αυγούστου λόγω δικαστικών διακοπών.'
    );
  }
  const addedDaysText = getSynedriaAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
