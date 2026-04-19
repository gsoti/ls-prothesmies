import { describe, expect, it } from 'vitest';
import { DeadlineType } from '../src/types';
import { prothesmiesCivilCase } from '../src/civilCase/prothesmiesCivilCase';
import { formatDeadlines } from './helpers/formatDeadlines';

describe('prothesmiesCivilCase unsupported fallback', () => {
  it('returns only katathesi and dikasimos for unsupported procedures', () => {
    const deadlines = prothesmiesCivilCase({
      diadikasia: 'ΑΣΦΑΛΙΣΤΙΚΑ ΜΕΤΡΑ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      apotelesma: '',
      dikasimos: '2024-09-18',
    });

    expect(deadlines).toEqual([
      expect.objectContaining({
        type: DeadlineType.KATATHESI,
        date: '2024-07-01',
        calculation: null,
      }),
      expect.objectContaining({
        type: DeadlineType.DIKASIMOS,
        date: '2024-09-18',
        calculation: null,
      }),
    ]);
    expect(formatDeadlines(deadlines)).toMatchInlineSnapshot(`
      "2024-07-01 - Κατάθεση   manual
      2024-09-18 - Δικάσιμος  manual"
    `);
  });
});
