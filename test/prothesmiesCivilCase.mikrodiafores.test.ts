import { describe, expect, it } from 'vitest';
import { prothesmiesCivilCase } from '../src/civilCase/prothesmiesCivilCase';
import {
  dikasimosDeadline,
  parseDeadlines,
} from '../src/civilCase/utils';
import { prothesmiesMikrodiaforon } from '../src/utils/Mikrodiafores/prothesmiesMikrodiaforon';
import { formatDeadlines } from './helpers/formatDeadlines';

describe('prothesmiesCivilCase Μικροδιαφορές branch', () => {
  it('routes Μικροδιαφορές cases through prothesmiesMikrodiaforon and appends dikasimos', () => {
    const civilCase = {
      diadikasia: 'ΜΙΚΡΟΔΙΑΦΟΡΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      apotelesma: '',
      exoterikou: true,
      dikasimos: '2024-12-10',
    };

    const deadlines = prothesmiesCivilCase(civilCase);
    const expected = parseDeadlines(
      prothesmiesMikrodiaforon('2024-07-01', {
        topiki: 'Αθηνών',
        exoterikou: true,
      })
    );
    expected.push(dikasimosDeadline('2024-12-10'));

    expect(deadlines).toEqual(expected);
    expect(formatDeadlines(deadlines)).toMatchInlineSnapshot(`
      "2024-07-01 - Κατάθεση                      manual
      2024-07-31 - Επίδοση                       30 ημέρες after katathesi
      2024-07-31 - Προσκομιδή της παρέμβασης     30 ημέρες after katathesi
      2024-09-05 - Προσθήκης επί της παρέμβασης  5 ημέρες after proskomidiParemv [paused: 31]
      2024-09-10 - Παρέμβαση                     40 ημέρες after katathesi [paused: 31]
      2024-09-20 - Προσκομιδή του εναγομένου     20 ημέρες after epidosi [paused: 31]
      2024-09-25 - Προσθήκη                      5 ημέρες after proskomidi
      2024-12-10 - Δικάσιμος                     manual"
    `);
  });
});
