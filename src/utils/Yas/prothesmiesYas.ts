import { checkValidDate } from '../Various/checkValidDate';
import { getOloklirosi } from './Categories/oloklirosi/getOloklirosi';
import { getOloklirosiDetails } from './Categories/oloklirosi/getOloklirosiDetails';

import { getSynedria } from './Categories/synedria/getSynedria';
import { getSynedriaDetails } from './Categories/synedria/getSynedriaDetails';

import { Options } from './Types/interfaces';

interface ProthesmiesYas {
  synedria: string;
  oloklirosi: string;
  synedriaDetails: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  oloklirosiDetails: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  // synedria: string;
  // lixi: string;

  // epidosiDetails?: {
  //   nomothesia: string[];
  //   ypologismos: string[];
  //   imeres: string[];
  // };
  // anakopiDetails?: {
  //   nomothesia: string[];
  //   ypologismos: string[];
  //   imeres: string[];
  // };
}

export const prothesmiesYas = (
  gnostopoiisi: string,
  options?: Options
): ProthesmiesYas => {
  if (!checkValidDate(gnostopoiisi)) {
    throw new Error(
      "Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2022-04-28')"
    );
  }
  if (gnostopoiisi < '2015-01-01') {
    throw new Error('Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα.');
  }
  let exoterikou = options?.exoterikou ?? false;

  let optionsDefault: Options = {
    exoterikou,
  };

  let synedria = getSynedria(gnostopoiisi, options ? options : optionsDefault);
  let oloklirosi = getOloklirosi(synedria);
  // let epidosi = getEpidosi(katathesi, options ? options : optionsDefault);
  // let anakopi = '';
  // if (options?.epidosiDone !== undefined) {
  //   anakopi = getAnakopi(
  //     options?.epidosiDone,
  //     options ? options : optionsDefault
  //   );
  // }

  const prothesmies: ProthesmiesYas = {
    synedria,
    oloklirosi,
    synedriaDetails: getSynedriaDetails(
      gnostopoiisi,
      synedria,
      options ? options : optionsDefault
    ),
    oloklirosiDetails: getOloklirosiDetails(synedria, oloklirosi),
  };

  return prothesmies;
};
