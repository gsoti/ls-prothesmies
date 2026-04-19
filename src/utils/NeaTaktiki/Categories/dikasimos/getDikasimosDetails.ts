import { Options } from '../../Types/interfaces';
import { DikasimosWindow } from './getDikasimosWindow';

const N5221_EFFECTIVE_DATE = '2026-01-01';

type DeadlineDetails = {
  nomothesia: string[];
  ypologismos: string[];
  imeres: string[];
};

export const getDikasimosDetails = (
  katathesi: string,
  options: Options,
  dikasimosWindow: DikasimosWindow
): DeadlineDetails | undefined => {
  if (new Date(katathesi).getTime() < new Date(N5221_EFFECTIVE_DATE).getTime()) {
    return undefined;
  }

  if (options.exoterikou) {
    return {
      nomothesia: [
        `Αρθ. 215 § 1 ΚΠολΔ (Ν. 5221/2025). Με την κατάθεση της αγωγής ορίζεται δικάσιμος, η οποία, όταν η αγωγή πρέπει να επιδοθεί στο εξωτερικό, προσδιορίζεται στην πρώτη δικάσιμο μετά την πάροδο εννέα (9) μηνών από την κατάθεση και πάντως όχι πάνω από τον δέκατο μήνα μετά από αυτήν.`,
      ],
      ypologismos: [
        `Στον υπολογισμό εξαιρέθηκε το διάστημα από 1 Ιουλίου έως 15 Σεπτεμβρίου (δικαστικές διακοπές).`,
        `Ελάχιστη ημερομηνία: ${
          dikasimosWindow.dikasimosEarliest ?? '—'
        }, μέγιστη ημερομηνία: ${dikasimosWindow.dikasimosLatest ?? '—'}.`,
      ],
      imeres: [`Διάστημα 9-10 μηνών από την κατάθεση (με εξαίρεση 1/7-15/9).`],
    };
  }

  return {
    nomothesia: [
      `Αρθ. 215 § 1 ΚΠολΔ (Ν. 5221/2025). Με την κατάθεση της αγωγής ορίζεται δικάσιμος, η οποία προσδιορίζεται σε διάστημα που δεν μπορεί να είναι μικρότερο από διακόσιες (200) ημέρες ούτε να υπερβαίνει τις διακόσιες δέκα (210) ημέρες από την κατάθεση.`,
    ],
    ypologismos: [
      `Στον υπολογισμό εξαιρέθηκε το διάστημα από 1 Ιουλίου έως 15 Σεπτεμβρίου (δικαστικές διακοπές).`,
      `Ελάχιστη ημερομηνία: ${
        dikasimosWindow.dikasimosEarliest ?? '—'
      }, μέγιστη ημερομηνία: ${dikasimosWindow.dikasimosLatest ?? '—'}.`,
    ],
    imeres: [`200-210 ημέρες από την κατάθεση (με εξαίρεση 1/7-15/9).`],
  };
};
