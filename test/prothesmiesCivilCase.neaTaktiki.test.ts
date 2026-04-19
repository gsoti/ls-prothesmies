import { describe, expect, it } from 'vitest';
import { prothesmiesCivilCase } from '../src/civilCase/prothesmiesCivilCase';
import { parseDeadlines } from '../src/civilCase/utils';
import { prothesmiesNeasTaktikis } from '../src/utils/NeaTaktiki/prothesmiesNeasTaktikis';
import { formatDeadlines } from './helpers/formatDeadlines';

describe('prothesmiesCivilCase Νέα Τακτική branch', () => {
  it('routes Νέα Τακτική cases through prothesmiesNeasTaktikis', () => {
    const civilCase = {
      diadikasia: 'ΝΕΑ ΤΑΚΤΙΚΗ ΜΟΝΟΜΕΛΟΥΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2026-01-08',
      apotelesma: '',
      exoterikou: true,
      klisi: true,
      dikasimos: '2026-09-15',
    };

    const deadlines = prothesmiesCivilCase(civilCase);
    const raw = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: true,
      klisi: true,
      dikasimos: '2026-09-15',
    });
    const expected = parseDeadlines({
      ...raw,
      dikasimos: raw.dikasimos ?? raw.dikasimosCalculated,
      dikasimosDetails:
        (raw as any).dikasimosDetails ?? raw.dikasimosCalculationDetails,
    });

    expect(deadlines).toEqual(expected);
    expect(formatDeadlines(deadlines)).toMatchInlineSnapshot(`
      "2026-01-08 - Κατάθεση                         manual
      2026-02-09 - Επίδοση                          30 ημέρες after katathesi [skipped: 2026-02-07, 2026-02-08]
      2026-04-20 - Παρέμβαση                        70 ημέρες after epidosi
      2026-05-08 - Προτάσεις                        manual
      2026-05-20 - Παρέμβαση του προσεπικαλούμενου  100 ημέρες after epidosi
      2026-05-25 - Προσθήκη                         manual
      2026-09-15 - Δικάσιμος                        manual"
    `);
  });
});
