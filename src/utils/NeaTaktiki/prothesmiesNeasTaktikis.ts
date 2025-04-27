import { getEpidosiCalculation } from './Categories/epidosi/getEpidosi';
import { getEpidosiDetails } from './Categories/epidosi/getEpidosiDetails';

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

interface ProthesmiesNeasTaktikis {
  katathesi: string;
  epidosi: string;
  paremvasi: string;
  paremvasiProsek: string;
  protaseis: string;
  prosthiki: string;
  dikasimos?: string;
  opsigeneis?: string;
  opsigeneisAntikrousi?: string;

  epidosiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
    hightlightedNomothesia: string[];
  };
  paremvasiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  paremvasiProsekDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  protaseisDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  prosthikiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  opsigeneisDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  opsigeneisAntikrousiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  epidosiCalculation: DateCalculation;
  paremvasiCalculation: DateCalculation;
  paremvasiProsekCalculation: DateCalculation;
  opsigeneisCalculation?: DateCalculation;
  opsigeneisAntikrousiCalculation?: DateCalculation;
}

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

  let optionsDefault: Options = {
    exoterikou,
    dimosio,
    topiki,
    yliki,
    dikasimos,
    klisi,
  };

  if (options !== undefined) {
    options.topiki = topiki;
  }
  if (options && options?.klisi === undefined) {
    options.klisi = klisi;
  }

  let epidosiCalculation = getEpidosiCalculation(katathesi, options ? options : optionsDefault);
  let epidosi = epidosiCalculation.date;
  let paremvasiCalculation = getParemvasiCalculation(katathesi, options ? options : optionsDefault);
  let paremvasi = paremvasiCalculation.date;
  let paremvasiProsekCalculation = getParemvasiProsekCalculation(
    katathesi,
    options ? options : optionsDefault
  );
  let paremvasiProsek = paremvasiProsekCalculation.date;
  // TODO: Have to add calculation logic for protaseis
  let protaseis = getProtaseis(katathesi, options ? options : optionsDefault);  
  // TODO: Have to add calculation logic for prosthiki
  let prosthiki = getProsthiki(protaseis, options ? options : optionsDefault);
  let opsigeneis = undefined;
  let opsigeneisAntikrousi = undefined;
  if (
    new Date(katathesi).getTime() >= new Date('2022-01-01').getTime() &&
    options?.dikasimos !== undefined
  ) {
    opsigeneis = getOpsigeneis(
      options?.dikasimos,
      options ? options : optionsDefault
    );
    opsigeneisAntikrousi = getAntikrousiOpsig(
      options?.dikasimos,
      options ? options : optionsDefault
    );
  }

  const prothesmies: ProthesmiesNeasTaktikis = {
    katathesi,
    epidosi,
    paremvasi,
    paremvasiProsek,
    protaseis,
    prosthiki,
    dikasimos: options?.dikasimos,
    opsigeneis,
    opsigeneisAntikrousi,
    epidosiDetails: getEpidosiDetails(
      katathesi,
      epidosi,
      options ? options : optionsDefault,
    ),
    paremvasiDetails: getParemvasiDetails(
      katathesi,
      paremvasi,
      options ? options : optionsDefault
    ),
    paremvasiProsekDetails: getParemvasiProsekDetails(
      katathesi,
      paremvasiProsek,
      options ? options : optionsDefault
    ),
    protaseisDetails: getProtaseisDetails(
      katathesi,
      protaseis,
      options ? options : optionsDefault
    ),
    prosthikiDetails: getProsthikiDetails(
      protaseis,
      prosthiki,
      options ? options : optionsDefault
    ),
    epidosiCalculation: epidosiCalculation,
    paremvasiCalculation: paremvasiCalculation,
    paremvasiProsekCalculation: paremvasiProsekCalculation,
  };
  if (opsigeneis !== undefined && options?.dikasimos !== undefined) {
    prothesmies.opsigeneisDetails = getOpsigeneisDetails(
      options.dikasimos,
      opsigeneis,
      options ? options : optionsDefault
    );
    let opsigeneisCalculation = getOpsigeneisCalculation(
      options?.dikasimos,
      options ? options : optionsDefault
    );
    prothesmies.opsigeneisCalculation = opsigeneisCalculation;
  }
  if (opsigeneisAntikrousi !== undefined && options?.dikasimos !== undefined) {
    prothesmies.opsigeneisAntikrousiDetails = getOpsigeneisAntikrousiDetails(
      options.dikasimos,
      opsigeneisAntikrousi,
      options ? options : optionsDefault
    );
    let opsigeneisAntikrousiCalculation = getAntikrousiOpsigCalculation(
      options?.dikasimos,
      options ? options : optionsDefault
    );
    prothesmies.opsigeneisAntikrousiCalculation = opsigeneisAntikrousiCalculation;
  }

  return prothesmies;
};
