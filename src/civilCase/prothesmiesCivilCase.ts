import { Deadline } from "../types";
import { prothesmiesNeasTaktikis } from "../utils/NeaTaktiki/prothesmiesNeasTaktikis";
import { Topiki } from "../utils/NeaTaktiki/Types/interfaces";
import { advancedCourtToTopiki } from "./topiki";
import { parseDeadlines } from "./utils";

export function prothesmiesCivilCase(
  civilCase: { 
    diadikasia: string, 
    court: string, 
    imerominia_katathesis: string, 
    dikasimos: string | undefined,
    dimosio?: boolean,
    exoterikou?: boolean,
    klisi?: boolean,
  }): Deadline[] {
    // Assign default value here
    const { dimosio = false } = civilCase; 
    const { exoterikou = false } = civilCase;
    const { klisi = false } = civilCase;
    // TODO: have to also produce the yliki
    const topiki = advancedCourtToTopiki(civilCase.court);
    if (
      civilCase.diadikasia === 'ΝΕΑ ΤΑΚΤΙΚΗ ΜΟΝΟΜΕΛΟΥΣ' ||
      civilCase.diadikasia === 'ΝΕΑ ΤΑΚΤΙΚΗ ΠΟΛΥΜΕΛΟΥΣ' ||
      civilCase.diadikasia === 'ΤΑΚΤΙΚΗ'
      // TODO: for some reason, the prothesmiesNeasTaktikis function does not work with these values
      // civilCase.diadikasia === 'ΤΑΚΤΙΚΗ ΜΟΝΟΜΕΛΟΥΣ' ||
      // civilCase.diadikasia === 'ΤΑΚΤΙΚΗ ΠΟΛΥΜΕΛΟΥΣ'
    ) {
      return _prothesmiesNeasTaktikis(
        civilCase, 
        dimosio,
        exoterikou,
        klisi,
        topiki
      );
    }
    return []
    //return unsupportedDeadlines(civilCase);
  }
  
  function _prothesmiesNeasTaktikis(
    civilCase: { 
      imerominia_katathesis: string, 
      dikasimos: string | undefined,
    }, 
    dimosio: boolean,
    exoterikou: boolean,
    klisi: boolean,
    topiki: Topiki
  ): Deadline[] {
    try {
      const prothesmies = prothesmiesNeasTaktikis(civilCase.imerominia_katathesis, {
        dimosio: dimosio,
        exoterikou: exoterikou,
        klisi: klisi,
        topiki: topiki,
        // yliki: 'Ειρ',
        dikasimos: civilCase.dikasimos,
        
      });
      return parseDeadlines(prothesmies);
    } catch (error) {
      throw error
    }
  }