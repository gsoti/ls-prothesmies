import { checkValidDate } from '../Various/checkValidDate';
import { getAnakopi } from './Categories/anakopi/getAnakopi';
import { getAnakopiDetails } from './Categories/anakopi/getAnakopiDetails';
import { getEpidosi } from './Categories/epidosi/getEpidosi';
import { getEpidosiDetails } from './Categories/epidosi/getEpidosiDetails';

import { Options } from './Types/interfaces';

interface ProthesmiesMikrodiaforon {
  katathesi: string;
  epidosi: string;
  anakopi?: string;

  epidosiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  anakopiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
}

export const prothesmiesDiatPliromis = (
  katathesi: string,
  options?: Options
): ProthesmiesMikrodiaforon => {
  if (!checkValidDate(katathesi)) {
    throw new Error(
      "Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2022-04-28')"
    );
  }
  if (katathesi < '2022-02-01') {
    throw new Error('Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα.');
  }
  let exoterikou = options?.exoterikou ?? false;
  let dimosio = options?.dimosio ?? false;
  let topiki = options?.topiki ?? 'Αθηνών';

  let optionsDefault: Options = {
    exoterikou,
    dimosio,
    topiki,
  };

  let epidosi = getEpidosi(katathesi, options ? options : optionsDefault);
  let anakopi = '';
  if (options?.epidosiDone !== undefined) {
    anakopi = getAnakopi(
      options?.epidosiDone,
      options ? options : optionsDefault
    );
  }

  const prothesmies: ProthesmiesMikrodiaforon = {
    katathesi,
    epidosi,
    epidosiDetails: getEpidosiDetails(
      katathesi,
      epidosi,
      options ? options : optionsDefault
    ),
  };
  if (options?.epidosiDone) {
    prothesmies.anakopi = anakopi;
    prothesmies.anakopiDetails = getAnakopiDetails(
      options?.epidosiDone,
      anakopi,
      options ? options : optionsDefault
    );
  }

  return prothesmies;
};
