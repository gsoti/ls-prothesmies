import { getEpidosiCalculation } from './Categories/epidosi/getEpidosi';
import { getEpidosiDetails } from './Categories/epidosi/getEpidosiDetails';
import { getDateErgasimesOnly } from '../CalculateDates/calculateDate';
import { argiesFunc } from '../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../Various/addAndRemoveDays';
import { anastoliFunc } from '../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from './Anastoles/anastoliDimosiou';

import { getParemvasiCalculation } from './Categories/paremvasi/getParemvasi';
import { getParemvasiProsekCalculation } from './Categories/paremvasiProsek/getParemvasiProsek';
import { getProtaseis } from './Categories/protaseis/getProtaseis';
import { getProsthiki } from './Categories/prosthiki/getProsthiki';
import { Options } from './Types/interfaces';
import { getOpsigeneis, getOpsigeneisCalculation } from './Categories/opsigeneis/getOpsigeneis';
import { getAntikrousiOpsig, getAntikrousiOpsigCalculation } from './Categories/opsigeneisAntikrousi/getOpsigeneisAntikrousi';
import { getParemvasiDetails } from './Categories/paremvasi/getParemvasiDetails';
import { getParemvasiProsekDetails } from './Categories/paremvasiProsek/getParemvasiProsekDetails';
import { getProtaseisDetails } from './Categories/protaseis/getProtaseisDetails';
import { getProsthikiDetails } from './Categories/prosthiki/getProsthikiDetails';
import { getOpsigeneisDetails } from './Categories/opsigeneis/getOpsigeneisDetails';
import { getOpsigeneisAntikrousiDetails } from './Categories/opsigeneisAntikrousi/getOpsigeneisAntikrousiDetails';
import { DateCalculation } from '../../types';
import { Nomothesia } from '../../nomothesia/types';
import { getDikasimosWindow } from './Categories/dikasimos/getDikasimosWindow';
import { getDikasimosDetails } from './Categories/dikasimos/getDikasimosDetails';

const N5221_EFFECTIVE_DATE = '2026-01-01';

type DeadlineDetails = {
  nomothesia: string[];
  ypologismos: string[];
  imeres: string[];
  formattedNomothesia?: Nomothesia[];
};

interface ProthesmiesNeasTaktikis {
  katathesi: string;
  epidosi: string;
  paremvasi: string;
  paremvasiProsek: string;
  protaseis: string;
  prosthiki: string;
  mode?: 'neataktiki' | 'eidikes';
  dikasimos?: string;
  dikasimosCalculated?: string;
  dikasimosEarliest?: string;
  dikasimosLatest?: string;
  opsigeneis?: string;
  opsigeneisAntikrousi?: string;
  antikrousiArt269?: string;

  epidosiDetails?: DeadlineDetails;
  paremvasiDetails?: DeadlineDetails;
  paremvasiProsekDetails?: DeadlineDetails;
  protaseisDetails?: DeadlineDetails;
  prosthikiDetails?: DeadlineDetails;
  opsigeneisDetails?: DeadlineDetails;
  opsigeneisAntikrousiDetails?: DeadlineDetails;
  antikrousiArt269Details?: DeadlineDetails;
  dikasimosCalculationDetails?: DeadlineDetails;
  epidosiCalculation?: DateCalculation;
  paremvasiCalculation?: DateCalculation;
  paremvasiProsekCalculation?: DateCalculation;
  opsigeneisCalculation?: DateCalculation;
  opsigeneisAntikrousiCalculation?: DateCalculation;
}

const isPostN5221 = (date: string): boolean =>
  new Date(date).getTime() >= new Date(N5221_EFFECTIVE_DATE).getTime();

export const prothesmiesNeasTaktikis = (
  katathesi: string,
  options?: Options
): ProthesmiesNeasTaktikis => {
  let exoterikou = options?.exoterikou ?? false;
  let dimosio = options?.dimosio ?? false;
  let topiki = options?.topiki ?? 'Αθηνών';
  let dikasimos = options?.dikasimos ?? undefined;
  let yliki = options?.yliki ?? 'Μον';
  let klisi = options?.klisi ?? false;
  let mode = options?.mode ?? 'neataktiki';

  let optionsDefault: Options = {
    exoterikou,
    dimosio,
    topiki,
    yliki,
    dikasimos,
    klisi,
    mode,
  };

  if (options !== undefined) {
    options.topiki = topiki;
  }
  if (options && options?.klisi === undefined) {
    options.klisi = klisi;
  }
  if (options && options?.mode === undefined) {
    options.mode = mode;
  }

  const activeOptions = options ? options : optionsDefault;
  const dikasimosWindow = getDikasimosWindow(katathesi, activeOptions);
  const dikasimosCalculationDetails = getDikasimosDetails(
    katathesi,
    activeOptions,
    dikasimosWindow
  );

  let epidosiCalculation = getEpidosiCalculation(katathesi, activeOptions);
  let epidosi = epidosiCalculation.date;
  let paremvasiCalculation = getParemvasiCalculation(katathesi, activeOptions);
  let paremvasi = paremvasiCalculation.date;
  let paremvasiProsekCalculation = getParemvasiProsekCalculation(
    katathesi,
    activeOptions
  );
  let paremvasiProsek = paremvasiProsekCalculation.date;
  let protaseis = getProtaseis(katathesi, activeOptions);
  let prosthiki = getProsthiki(protaseis, activeOptions);

  if (mode === 'eidikes') {
    if (!isPostN5221(katathesi)) {
      throw new Error(
        `Το mode "eidikes" υποστηρίζεται μόνο για αγωγές που κατατίθενται από ${N5221_EFFECTIVE_DATE}.`
      );
    }

    const epidosiBaseDetails = getEpidosiDetails(katathesi, epidosi, activeOptions);
    let eidikesProtaseis = '';
    let eidikesProsthiki = '';
    let protaseisDetails: DeadlineDetails = {
      nomothesia: [
        `Ειδικές διαδικασίες (Ν. 5221/2025, ισχύς από 1/1/2026): η κατάθεση προτάσεων παραμένει συνδεδεμένη με τη συζήτηση.`,
      ],
      ypologismos: [],
      imeres: ['Κατά τη συζήτηση (δικάσιμο).'],
    };
    let prosthikiDetails: DeadlineDetails = {
      nomothesia: [
        `Ειδικές διαδικασίες (Ν. 5221/2025, ισχύς από 1/1/2026): προβλέπεται προσθήκη-αντίκρουση εντός πέντε (5) εργασίμων ημερών μετά τη συζήτηση.`,
      ],
      ypologismos: [],
      imeres: ['5 εργάσιμες ημέρες μετά τη συζήτηση (δικάσιμο).'],
    };

    if (activeOptions.dikasimos !== undefined) {
      let argiesDimosiou: string[] = [];
      if (activeOptions.dimosio) {
        argiesDimosiou = anastoliDimosiouFunc();
      }

      const yearDikasimos = parseInt(activeOptions.dikasimos.slice(0, 4), 10);
      const prosthikiDate = getDateErgasimesOnly(activeOptions.dikasimos, 5, {
        argies: addArgAndAnastDays(argiesFunc(yearDikasimos), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(yearDikasimos), [
          ...argiesDimosiou,
        ]),
      });

      eidikesProtaseis = activeOptions.dikasimos;
      eidikesProsthiki = prosthikiDate.date.toISOString().split('T')[0];
    } else {
      protaseisDetails.ypologismos.push(
        'Δεν υπολογίστηκε συγκεκριμένη ημερομηνία προτάσεων γιατί δεν δόθηκε δικάσιμος.'
      );
      prosthikiDetails.ypologismos.push(
        'Δεν υπολογίστηκε προσθήκη-αντίκρουση γιατί απαιτείται ημερομηνία δικασίμου.'
      );
    }

    return {
      katathesi,
      mode,
      epidosi,
      protaseis: eidikesProtaseis,
      prosthiki: eidikesProsthiki,
      paremvasi: '',
      paremvasiProsek: '',
      dikasimos: activeOptions.dikasimos,
      dikasimosCalculated: dikasimosWindow.dikasimosCalculated,
      dikasimosEarliest: dikasimosWindow.dikasimosEarliest,
      dikasimosLatest: dikasimosWindow.dikasimosLatest,
      epidosiDetails: {
        nomothesia: [
          `Αρθ. 215 § 2 ΚΠολΔ (Ν. 5221/2025). Για αγωγές που κατατίθενται από 1/1/2026, η αγωγή επιδίδεται εντός τριάντα (30) ημερών από την κατάθεση. Η προθεσμία είναι ενιαία και για διαδίκους εξωτερικού/αγνώστου διαμονής, με επίδοση και στον εισαγγελέα εντός της ίδιας προθεσμίας. Αν παρέλθει άπρακτη, η αγωγή θεωρείται ως μη ασκηθείσα.`,
        ],
        ypologismos: epidosiBaseDetails.ypologismos,
        imeres: epidosiBaseDetails.imeres,
        formattedNomothesia: epidosiBaseDetails.formattedNomothesia,
      },
      protaseisDetails,
      prosthikiDetails,
      dikasimosCalculationDetails,
      epidosiCalculation,
    };
  }

  let opsigeneis = undefined;
  let opsigeneisAntikrousi = undefined;
  let antikrousiArt269 = undefined;
  const prothesmies: ProthesmiesNeasTaktikis = {
    katathesi,
    mode,
    epidosi,
    paremvasi,
    paremvasiProsek,
    protaseis,
    prosthiki,
    dikasimos: activeOptions.dikasimos,
    dikasimosCalculated: dikasimosWindow.dikasimosCalculated,
    dikasimosEarliest: dikasimosWindow.dikasimosEarliest,
    dikasimosLatest: dikasimosWindow.dikasimosLatest,
    opsigeneis,
    opsigeneisAntikrousi,
    antikrousiArt269,
    epidosiDetails: getEpidosiDetails(
      katathesi,
      epidosi,
      activeOptions
    ),
    paremvasiDetails: getParemvasiDetails(
      katathesi,
      paremvasi,
      activeOptions
    ),
    paremvasiProsekDetails: getParemvasiProsekDetails(
      katathesi,
      paremvasiProsek,
      activeOptions
    ),
    protaseisDetails: getProtaseisDetails(
      katathesi,
      protaseis,
      activeOptions
    ),
    prosthikiDetails: getProsthikiDetails(
      protaseis,
      prosthiki,
      activeOptions
    ),
    epidosiCalculation: epidosiCalculation,
    paremvasiCalculation: paremvasiCalculation,
    paremvasiProsekCalculation: paremvasiProsekCalculation,
    dikasimosCalculationDetails,
  };
  if (activeOptions.dikasimos !== undefined) {
    if (isPostN5221(katathesi)) {
      let argiesDimosiou: string[] = [];
      if (activeOptions.dimosio) {
        argiesDimosiou = anastoliDimosiouFunc();
      }
      const yearDikasimos = parseInt(activeOptions.dikasimos.slice(0, 4), 10);
      const antikrousiDate = getDateErgasimesOnly(activeOptions.dikasimos, 5, {
        argies: addArgAndAnastDays(argiesFunc(yearDikasimos), [...extraArgies]),
        anastoli: addArgAndAnastDays(anastoliFunc(yearDikasimos), [
          ...argiesDimosiou,
        ]),
      });
      antikrousiArt269 = antikrousiDate.date.toISOString().split('T')[0];
      prothesmies.antikrousiArt269 = antikrousiArt269;
      prothesmies.antikrousiArt269Details = {
        nomothesia: [
          `Αρθ. 269 § 3 ΚΠολΔ (Ν. 5221/2025). Μετά τη συζήτηση, οι διάδικοι δικαιούνται, μέσα σε πέντε (5) εργάσιμες ημέρες, να καταθέσουν σημείωμα για την αντίκρουση ισχυρισμών που προβλήθηκαν κατά τη συζήτηση. Βλ. Αρθ. 269 § 3 ΚΠολΔ, όπως αντικαταστάθηκε με το Ν. 5221/2025 (Α' 133/28-7-2025). Ισχύει για αγωγές και κλήσεις που κατατίθενται από 1/1/2026.`,
        ],
        ypologismos: [],
        imeres: [`5 εργάσιμες ημέρες μετά τη συζήτηση (δικάσιμο).`],
      };
    } else if (new Date(katathesi).getTime() >= new Date('2022-01-01').getTime()) {
      opsigeneis = getOpsigeneis(activeOptions.dikasimos, activeOptions);
      opsigeneisAntikrousi = getAntikrousiOpsig(
        activeOptions.dikasimos,
        activeOptions
      );
      prothesmies.opsigeneis = opsigeneis;
      prothesmies.opsigeneisAntikrousi = opsigeneisAntikrousi;
    }
  }

  if (opsigeneis !== undefined && activeOptions.dikasimos !== undefined) {
    prothesmies.opsigeneisDetails = getOpsigeneisDetails(
      activeOptions.dikasimos,
      opsigeneis,
      activeOptions
    );
    let opsigeneisCalculation = getOpsigeneisCalculation(
      activeOptions.dikasimos,
      activeOptions
    );
    prothesmies.opsigeneisCalculation = opsigeneisCalculation;
  }
  if (
    opsigeneisAntikrousi !== undefined &&
    activeOptions.dikasimos !== undefined
  ) {
    prothesmies.opsigeneisAntikrousiDetails = getOpsigeneisAntikrousiDetails(
      activeOptions.dikasimos,
      opsigeneisAntikrousi,
      activeOptions
    );
    let opsigeneisAntikrousiCalculation = getAntikrousiOpsigCalculation(
      activeOptions.dikasimos,
      activeOptions
    );
    prothesmies.opsigeneisAntikrousiCalculation = opsigeneisAntikrousiCalculation;
  }

  return prothesmies;
};
