import { describe, expect, it } from 'vitest';
import { prothesmiesNeasTaktikis } from '../src/utils/NeaTaktiki/prothesmiesNeasTaktikis';

describe('Υπολογισμός Προθεσμιών Ειδικών Διαδικασιών (mode: eidikes)', () => {
  it('throws for filings before 2026-01-01', () => {
    expect(() =>
      prothesmiesNeasTaktikis('2025-12-31', {
        mode: 'eidikes',
      })
    ).toThrow('2026-01-01');
  });

  it('uses the same 30-day service window for local and foreign residence', () => {
    const local = prothesmiesNeasTaktikis('2026-01-08', {
      mode: 'eidikes',
      topiki: 'Αθηνών',
      exoterikou: false,
    });
    const foreign = prothesmiesNeasTaktikis('2026-01-08', {
      mode: 'eidikes',
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(foreign.epidosi).toBe(local.epidosi);
    expect(foreign.epidosiDetails?.imeres).toEqual([
      '30 ημέρες από την κατάθεση της αγωγής.',
    ]);
  });

  it('calculates prosthiki only when dikasimos is provided', () => {
    const withDikasimos = prothesmiesNeasTaktikis('2026-02-10', {
      mode: 'eidikes',
      topiki: 'Αθηνών',
      dikasimos: '2026-06-10',
    });
    const withoutDikasimos = prothesmiesNeasTaktikis('2026-02-10', {
      mode: 'eidikes',
      topiki: 'Αθηνών',
    });

    expect(withDikasimos.protaseis).toBe('2026-06-10');
    expect(withDikasimos.prosthiki).not.toBe('');
    expect(withDikasimos.prosthikiDetails?.imeres).toEqual([
      '5 εργάσιμες ημέρες μετά τη συζήτηση (δικάσιμο).',
    ]);

    expect(withoutDikasimos.protaseis).toBe('');
    expect(withoutDikasimos.prosthiki).toBe('');
    expect(withoutDikasimos.prosthikiDetails?.ypologismos[0]).toContain(
      'απαιτείται ημερομηνία δικασίμου'
    );
  });

  it('returns Article 215 dikasimos bounds in eidikes mode after 2026', () => {
    const result = prothesmiesNeasTaktikis('2026-03-05', {
      mode: 'eidikes',
      topiki: 'Αθηνών',
      exoterikou: false,
    });

    expect(result.dikasimosEarliest).toBeDefined();
    expect(result.dikasimosLatest).toBeDefined();
    expect(result.dikasimosCalculated).toBe(result.dikasimosEarliest);
    expect(result.dikasimosCalculationDetails?.imeres[0]).toContain('200-210');
  });
});
