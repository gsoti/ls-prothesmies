import { describe, expect, it } from 'vitest';
import { prothesmiesCivilCase } from '../src/civilCase/prothesmiesCivilCase';
import { parseDeadlines } from '../src/civilCase/utils';
import { prothesmiesNeasTaktikis } from '../src/utils/NeaTaktiki/prothesmiesNeasTaktikis';
import { formatDeadlines } from './helpers/formatDeadlines';

describe('prothesmiesCivilCase court-to-topiki mapping', () => {
  it('maps peripheral court labels to the matching topiki before calculating deadlines', () => {
    const mappedCourtCase = {
      diadikasia: 'ΝΕΑ ΤΑΚΤΙΚΗ ΜΟΝΟΜΕΛΟΥΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)',
      imerominia_katathesis: '2021-01-10',
      apotelesma: '',
    };

    const mappedDeadlines = prothesmiesCivilCase(mappedCourtCase);
    const athensDeadlines = prothesmiesCivilCase({
      ...mappedCourtCase,
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
    });
    const raw = prothesmiesNeasTaktikis('2021-01-10', {
      topiki: 'Αχαρνών',
    });
    const expected = parseDeadlines({
      ...raw,
      dikasimos: raw.dikasimos ?? raw.dikasimosCalculated,
      dikasimosDetails:
        (raw as any).dikasimosDetails ?? raw.dikasimosCalculationDetails,
    });

    expect(mappedDeadlines).toEqual(expected);
    expect(mappedDeadlines.find(d => d.type === 'protaseis')?.date).toBe(
      '2021-04-20'
    );
    expect(athensDeadlines.find(d => d.type === 'protaseis')?.date).toBe(
      '2021-05-24'
    );
    expect(mappedDeadlines.find(d => d.type === 'protaseis')?.date).not.toBe(
      athensDeadlines.find(d => d.type === 'protaseis')?.date
    );
    expect(formatDeadlines(mappedDeadlines)).toMatchInlineSnapshot(`
      "2021-01-10 - Κατάθεση                         manual
      2021-02-09 - Επίδοση                          30 ημέρες after katathesi
      2021-03-11 - Παρέμβαση                        60 ημέρες after katathesi
      2021-04-12 - Παρέμβαση του προσεπικαλούμενου  90 ημέρες after katathesi [skipped: 2021-04-10, 2021-04-11]
      2021-04-20 - Προτάσεις                        manual
      2021-05-05 - Προσθήκη                         manual"
    `);
  });
});
