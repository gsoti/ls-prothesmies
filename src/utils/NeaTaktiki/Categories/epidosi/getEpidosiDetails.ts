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
import { getEpidosiAddedDays } from './getEpidosAddedDays';
import { checkIfIncluded } from '../../../Dikastiria/dikastiria';

export const getEpidosiDetails = (
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
      (r.eidos.includes('epidosi') || r.eidos.includes('all'))
  );
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `Αρθ. 215 § 2 ΚΠολΔ Στην περίπτωση του άρθρου 237, η αγωγή επιδίδεται στον εναγόμενο μέσα σε προθεσμία τριάντα (30) ημερών από την κατάθεσή της και αν αυτός ή κάποιος από τους ομοδίκους διαμένει στο εξωτερικό ή είναι άγνωστης διαμονής μέσα σε προθεσμία εξήντα (60) ημερών. Αν η αγωγή δεν επιδοθεί μέσα στην προθεσμία αυτή, θεωρείται ως μη ασκηθείσα. (όπως τροποποιήθηκε με το άρθρο δεύτερο του άρθρου 1 του Ν.4335/2015, ΦΕΚ Α 87. Έναρξη ισχύος από 1.1.2016).`,
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
  const addedDaysText = getEpidosiAddedDays(start, options);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
