import { checkValidDate } from '../Various/checkValidDate';

import { getLixi } from './Categories/lixi/getLixi';
import { getLixiDetails } from './Categories/lixi/getLixiDetails';

import { Options } from './Types/interfaces';

interface ProthesmiesMikrodiaforon {
  apoviosi: string;
  lixi: string;

  lixiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
}

export const prothesmiesApopoiisis = (
  apoviosi: string,
  options?: Options
): ProthesmiesMikrodiaforon => {
  if (!checkValidDate(apoviosi)) {
    throw new Error(
      "Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2022-04-28')"
    );
  }
  if (apoviosi < '2022-02-01') {
    throw new Error('Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα.');
  }
  let exoterikou = options?.exoterikou ?? false;
  let topiki = options?.topiki ?? 'Αθηνών';

  let optionsDefault: Options = {
    exoterikou,
    topiki,
  };

  let lixi = getLixi(apoviosi, options ? options : optionsDefault);

  const prothesmies: ProthesmiesMikrodiaforon = {
    apoviosi,
    lixi,
    lixiDetails: getLixiDetails(apoviosi, options ? options : optionsDefault),
  };

  return prothesmies;
};
