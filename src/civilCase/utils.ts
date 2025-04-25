import { Deadline, DeadlineType } from "../types";

/**
 * Parses the input JSON into an array of Deadline objects
 */
export function parseDeadlines(input: any): Deadline[] {
  const deadlines: Deadline[] = [];

  // Find all deadline keys (those without "Details" suffix)
  const deadlineKeys = Object.keys(input).filter(key => !key.endsWith('Details') && !key.endsWith('Calculation') && input[key]);

  for (const key of deadlineKeys) {
    const type = mapToDeadlineType(key);
    const detailsKey = `${key}Details`;
    const details = input[detailsKey] || { nomothesia: [], ypologismos: [], imeres: [] };

    const calculationKey = `${key}Calculation`;

    const deadline: Deadline = {
      name: getDeadlineName(type),
      type: type,
      date: input[key],
      nomothesia: details.nomothesia || [],
      ypologismos: details.ypologismos || [],
      imeres: details.imeres || [],
      calculation: input[calculationKey] || null,
    };

    deadlines.push(deadline);
  }

  return deadlines;
}

export function unsupportedDeadlines(
  civilCase: {
    diadikasia: string,
    court: string,
    imerominia_katathesis: string,
    dikasimos: string | undefined,
  }
): Deadline[] {
  const deadlines: Deadline[] = [
    {
      name: getDeadlineName(DeadlineType.KATATHESI),
      type: DeadlineType.KATATHESI,
      date: civilCase.imerominia_katathesis,
      nomothesia: [],
      ypologismos: [],
      imeres: [],
      calculation: null,
    }
  ];

  if (civilCase.dikasimos) {
    deadlines.push(dikasimosDeadline(civilCase.dikasimos));
  }

  return deadlines;
}

export function dikasimosDeadline(
  dikasimos: string
): Deadline {
  return {
    name: getDeadlineName(DeadlineType.DIKASIMOS),
    type: DeadlineType.DIKASIMOS,
    date: dikasimos,
    nomothesia: [],
    ypologismos: [],
    imeres: [],
    calculation: null,
  };
}


/**
 * Maps a key from the input object to a DeadlineType
 */
function mapToDeadlineType(key: string): DeadlineType {
  switch (key) {
    case 'katathesi': return DeadlineType.KATATHESI;
    case 'epidosi': return DeadlineType.EPIDOSI;
    case 'paremvasi': return DeadlineType.PAREMVASI;
    case 'paremvasiProsek': return DeadlineType.PAREMVASI_PROSEK;
    case 'protaseis': return DeadlineType.PROTASEIS;
    case 'prosthiki': return DeadlineType.PROSTHIKI;
    case 'opsigeneis': return DeadlineType.OPSIGENEIS;
    case 'opsigeneisAntikrousi': return DeadlineType.OPSIGENEIS_ANTIKROUSI;
    case 'dikasimos': return DeadlineType.DIKASIMOS;
    case 'proskomidi': return DeadlineType.PROSKOMIDI;
    case 'proskomidiParemv': return DeadlineType.PROSKOMIDI_PAREMV;
    case 'prosthikiParemv': return DeadlineType.PROSTHIKI_PAREMV;
    default: throw new Error(`Unknown deadline type: ${key}`);
  }
}

/**
* Maps a human-readable name to each deadline type
*/
function getDeadlineName(type: DeadlineType): string {
  switch (type) {
    case DeadlineType.KATATHESI: return "Κατάθεση";
    case DeadlineType.EPIDOSI: return "Επίδοση";
    case DeadlineType.PAREMVASI: return "Παρέμβαση, προσεπίκληση, ανακοίνωση ή ανταγωγή";
    case DeadlineType.PAREMVASI_PROSEK: return "Παρέμβαση του προσεπικαλούμενου";
    case DeadlineType.PROTASEIS: return "Κατάθεση προτάσεων";
    case DeadlineType.PROSTHIKI: return "Κατάθεση προσθήκης";
    case DeadlineType.OPSIGENEIS: return "Οψιγενείς ή παραχρήμα αποδεικνυόμενοι ισχυρυσμοί";
    case DeadlineType.OPSIGENEIS_ANTIKROUSI: return "Αντίκρουση σε οψιγενείς";
    case DeadlineType.DIKASIMOS: return "Δικάσιμος";
    case DeadlineType.PROSKOMIDI: return "Προσκομιδή των αποδεικτικών από τους διαδίκους και η υποβολή του έγγραφου υπομνήματος του εναγομένου";
    case DeadlineType.PROSKOMIDI_PAREMV: return "Προσκομιδή των αποδεικτικών και η υποβολή του έγγραφου υπομνήματος της παρέμβασης ή της ανταγωγής";
    case DeadlineType.PROSTHIKI_PAREMV: return "Κατάθεση προσθήκης επί της παρέμβασης ή της ανταγωγής";
  }
}