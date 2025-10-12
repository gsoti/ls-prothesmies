import { Nomothesia } from '../../nomothesia/types';
import { DateCalculation } from '../../types';
import { getProsthiki, getProsthikiCalculation } from './Categories/prosthiki/getProsthiki';
import { getProsthikiDetails } from './Categories/prosthiki/getProsthikiDetails';

interface ProthesmiesEidikesDiadikasies {
  dikasimos: string;
  prosthiki: string;

  prosthikiDetails?: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
    formattedNomothesia: Nomothesia[];
  };
  prosthikiCalculation?: DateCalculation;
}

export const prothesmiesEidikesDiadikasies = (
  dikasimos: string
): ProthesmiesEidikesDiadikasies => {
  const prosthiki = getProsthiki(dikasimos);
  const prosthikiCalculation = getProsthikiCalculation(dikasimos);

  const prothesmies: ProthesmiesEidikesDiadikasies = {
    dikasimos,
    prosthiki,
    prosthikiDetails: getProsthikiDetails(dikasimos),
    prosthikiCalculation,
  };

  return prothesmies;
};
