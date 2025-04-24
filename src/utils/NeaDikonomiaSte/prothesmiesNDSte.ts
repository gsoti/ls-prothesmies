import { checkValidDate } from '../Various/checkValidDate';
import { getApopseisDioikisis } from './Categories/apopseisDioikisis/getApopseisDioikisis';
import { getApopseisDioikisisDetails } from './Categories/apopseisDioikisis/getApopseisDioikisisDetails';

import { getEpidosi } from './Categories/lixi/getLixi';
import { getLixiDetails } from './Categories/lixi/getLixiDetails';
import { getProsthetoiLogoi } from './Categories/prosthetoiLogoi/getProsthetoiLogoi';
import { getProsthetoiLogoiDetails } from './Categories/prosthetoiLogoi/getProsthetoiLogoiDetails';

interface ProthesmiesMikrodiaforon {
  katathesi: string;
  prothesmiaEpidosis: string;
  epidosi?: string;
  dikasimos?: string;
  apopseis?: string;
  apopseisDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  prothesmiaEpidosisDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
  prosthetoiLogoi?: string;
  prosthetoiLogoiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  };
}

export const prothesmiesNDSte = (
  katathesi: string,
  epidosi?: string
): ProthesmiesMikrodiaforon => {
  if (!checkValidDate(katathesi)) {
    throw new Error(
      "Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2024-10-28')"
    );
  }
  if (katathesi < '2024-09-16') {
    throw new Error('Επιτρέπονται οι ημερομηνίες από 06.09.2024 και έπειτα.');
  }

  let prothesmiaEpidosis = getEpidosi(katathesi);

  const prothesmies: ProthesmiesMikrodiaforon = {
    katathesi,
    prothesmiaEpidosis,
    epidosi: epidosi || undefined,
    apopseis: epidosi ? getApopseisDioikisis(epidosi) : undefined,
    prothesmiaEpidosisDetails: getLixiDetails(katathesi),
    apopseisDetails: epidosi ? getApopseisDioikisisDetails(epidosi) : undefined,
    prosthetoiLogoi: epidosi ? getProsthetoiLogoi(epidosi) : undefined,
    prosthetoiLogoiDetails: epidosi
      ? getProsthetoiLogoiDetails(epidosi)
      : undefined,
  };

  return prothesmies;
};

console.log(prothesmiesNDSte('2025-05-02', '2025-07-28'));
