// import { checkIfAnastoliDiakopon } from '../../../Various/checkEarlierOrLaterDate';
import { getApopseisDioikisisAddedDays } from './getApopseisDioikisisAddedDays';

export const getApopseisDioikisisDetails = (start: string) => {
  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };
  text.nomothesia = [
    `ΠΔ 18/1989 - Αρθ.23  § 2. Η έκθεση των απόψεων της Διοίκησης και ο φάκελος της υπόθεσης αποστέλλονται στο Δικαστήριο εντός τριών (3) μηνών από την επίδοση του ενδίκου βοηθήματος σύμφωνα με την περ. α΄ της παρ. 1 του άρθρου 21. Εντός της ίδιας προθεσμίας προσκομίζουν και οι λοιποί διάδικοι κάθε στοιχείο για την απόδειξη του εννόμου συμφέροντος και των πραγματικών ισχυρισμών τους.`,
  ];

  const addedDaysText = getApopseisDioikisisAddedDays(start);
  text.ypologismos = [...text.ypologismos, ...addedDaysText.ypologismos];
  text.imeres = addedDaysText.imeres;

  return text;
};
