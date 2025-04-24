import { getEpidosi } from './Categories/epidosi/getEpidosi';
import { getEpidosiDetails } from './Categories/epidosi/getEpidosiDetails';

import { getParemvasi } from './Categories/paremvasi/getParemvasi';
import { getParemvasiDetails } from './Categories/paremvasi/getParemvasiDetails';

import { getProskomidi } from './Categories/proskomidi/getProskomidi';
import { getProskomidiDetails } from './Categories/proskomidi/getProskomidiDetails';

import { getProskomParemv } from './Categories/proskomidiParemvasis/getProskomParemv';
import { getProskomParemvDetails } from './Categories/proskomidiParemvasis/getProskomParemvDetails';

import { getProsthiki } from './Categories/prosthiki/getProsthiki';
import { getProsthikiDetails } from './Categories/prosthiki/getProsthikiDetails';

import { getProsthParemv } from './Categories/prosthikiParemvasis/getProsthParemv';
import { getProsthParemvDetails } from './Categories/prosthikiParemvasis/getProsthikiDetails';
import { Options } from './Types/interfaces';

interface ProthesmiesMikrodiaforon {
  katathesi: string;
  epidosi: string;
  proskomidi: string;
  prosthiki: string;
  paremvasi: string;
  proskomidiParemv: string;
  prosthikiParemv: string;
  katathesiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  epidosiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  proskomidiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  prosthikiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  paremvasiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  proskomidiParemvDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  prosthikiParemvDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
}

export const prothesmiesMikrodiaforon = (
  katathesi: string,
  options?: Options
): ProthesmiesMikrodiaforon => {
  let exoterikou = options?.exoterikou ?? false;
  let dimosio = options?.dimosio ?? false;
  let topiki = options?.topiki ?? 'Αθηνών';

  let optionsDefault: Options = {
    exoterikou,
    dimosio,
    topiki,
  };

  let epidosi = getEpidosi(katathesi, options ? options : optionsDefault);
  let proskomidi = getProskomidi(epidosi, options ? options : optionsDefault);
  let prosthiki = getProsthiki(proskomidi, options ? options : optionsDefault);
  let paremvasi = getParemvasi(katathesi, options ? options : optionsDefault);
  let proskomidiParemv = getProskomParemv(
    katathesi,
    options ? options : optionsDefault
  );
  let prosthikiParemv = getProsthParemv(
    proskomidiParemv,
    options ? options : optionsDefault
  );

  const prothesmies: ProthesmiesMikrodiaforon = {
    katathesi,
    epidosi,
    proskomidi,
    prosthiki,
    paremvasi,
    proskomidiParemv,
    prosthikiParemv,
    epidosiDetails: getEpidosiDetails(
      katathesi,
      epidosi,
      options ? options : optionsDefault
    ),
    proskomidiDetails: getProskomidiDetails(
      epidosi,
      proskomidi,
      options ? options : optionsDefault
    ),
    prosthikiDetails: getProsthikiDetails(
      proskomidi,
      prosthiki,
      options ? options : optionsDefault
    ),
    paremvasiDetails: getParemvasiDetails(
      katathesi,
      paremvasi,
      options ? options : optionsDefault
    ),
    proskomidiParemvDetails: getProskomParemvDetails(
      katathesi,
      proskomidiParemv,
      options ? options : optionsDefault
    ),
    prosthikiParemvDetails: getProsthParemvDetails(
      proskomidiParemv,
      prosthiki,
      options ? options : optionsDefault
    ),
  };

  return prothesmies;
};
