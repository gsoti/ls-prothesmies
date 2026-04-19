import { describe, expect, it } from 'vitest';
import { prothesmiesNeasTaktikis } from '../src/utils/NeaTaktiki/prothesmiesNeasTaktikis';

const addDaysIso = (date: string, days: number): string => {
  const dt = new Date(`${date}T00:00:00.000Z`);
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
};

describe('Υπολογισμός Προθεσμιών Νέας Τακτικής', () => {
  it('returns post-2026 domestic dikasimos cap fields from Article 215', () => {
    const result = prothesmiesNeasTaktikis('2026-02-01', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });

    expect(result.dikasimosEarliest).toBeDefined();
    expect(result.dikasimosLatest).toBeDefined();
    expect(result.dikasimosCalculated).toBe(result.dikasimosEarliest);
    expect(
      new Date(result.dikasimosLatest as string).getTime()
    ).toBeGreaterThan(new Date(result.dikasimosEarliest as string).getTime());
    expect(result.dikasimosCalculationDetails?.nomothesia[0]).toContain(
      'διακόσιες (200) ημέρες'
    );
    expect(result.dikasimosCalculationDetails?.nomothesia[0]).toContain(
      'διακόσιες δέκα (210) ημέρες'
    );
  });

  it('applies 1/7-15/9 suspension adjustment to domestic dikasimos cap', () => {
    const filingDate = '2026-01-10';
    const result = prothesmiesNeasTaktikis(filingDate, {
      topiki: 'Αθηνών',
      exoterikou: false,
    });
    const raw210Days = addDaysIso(filingDate, 210);
    const raw200Days = addDaysIso(filingDate, 200);

    expect(result.dikasimosEarliest).toBeDefined();
    expect(result.dikasimosLatest).toBeDefined();
    expect((result.dikasimosEarliest as string) > raw200Days).toBe(true);
    expect((result.dikasimosLatest as string) > raw210Days).toBe(true);
    expect(result.dikasimosCalculationDetails?.ypologismos[0]).toContain(
      '1 Ιουλίου έως 15 Σεπτεμβρίου'
    );
  });

  it('returns post-2026 foreign dikasimos earliest/latest bounds', () => {
    const result = prothesmiesNeasTaktikis('2026-02-01', {
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(result.dikasimosEarliest).toBeDefined();
    expect(result.dikasimosLatest).toBeDefined();
    expect(result.dikasimosCalculated).toBe(result.dikasimosEarliest);
    expect(
      new Date(result.dikasimosLatest as string).getTime()
    ).toBeGreaterThan(new Date(result.dikasimosEarliest as string).getTime());
  });

  it('preserves user-provided dikasimos while still returning calculated bounds', () => {
    const result = prothesmiesNeasTaktikis('2026-02-01', {
      topiki: 'Αθηνών',
      exoterikou: false,
      dikasimos: '2026-12-15',
    });

    expect(result.dikasimos).toBe('2026-12-15');
    expect(result.dikasimosCalculated).toBe('2026-12-15');
    expect(result.dikasimosLatest).toBeDefined();
  });

  it('does not return new dikasimos calculation fields before 2026', () => {
    const result = prothesmiesNeasTaktikis('2025-12-31', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });

    expect(result.dikasimosCalculated).toBeUndefined();
    expect(result.dikasimosEarliest).toBeUndefined();
    expect(result.dikasimosLatest).toBeUndefined();
    expect(result.dikasimosCalculationDetails).toBeUndefined();
  });

  it('uses fixed 30-day service window after 2026, even for foreign residence', () => {
    const local = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });
    const foreign = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(foreign.epidosi).toBe(local.epidosi);
    expect(foreign.epidosiDetails?.imeres).toEqual([
      '30 ημέρες από την κατάθεση της αγωγής.',
    ]);
    expect(foreign.epidosiDetails?.nomothesia[0]).toContain(
      'μέσα στην ίδια προθεσμία'
    );
    expect(foreign.epidosiDetails?.nomothesia[0]).not.toContain(
      'εξήντα (60) ημερών'
    );
  });

  it('keeps 60-day extension for foreign residence before 2026', () => {
    const local = prothesmiesNeasTaktikis('2025-12-01', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });
    const foreign = prothesmiesNeasTaktikis('2025-12-01', {
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(foreign.epidosi).not.toBe(local.epidosi);
    expect(foreign.epidosiDetails?.imeres).toEqual([
      '60 ημέρες από την κατάθεση της αγωγής.',
    ]);
  });

  it('still applies post-2026 foreign extensions to dependent deadlines', () => {
    const local = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });
    const foreign = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(new Date(foreign.paremvasi).getTime()).toBeGreaterThan(
      new Date(local.paremvasi).getTime()
    );
    expect(new Date(foreign.paremvasiProsek).getTime()).toBeGreaterThan(
      new Date(local.paremvasiProsek).getTime()
    );
    expect(new Date(foreign.protaseis).getTime()).toBeGreaterThan(
      new Date(local.protaseis).getTime()
    );
    expect(foreign.paremvasiDetails?.imeres).toEqual([
      '70 ημέρες από το πέρας της προθεσμίας επίδοσης.',
    ]);
    expect(foreign.paremvasiProsekDetails?.imeres).toEqual([
      '100 ημέρες από το πέρας της προθεσμίας επίδοσης.',
    ]);
    expect(foreign.protaseisDetails?.imeres).toEqual([
      'Eντός 120 ημερών από το τέλος της προθεσμίας για επίδοση της αγωγής.',
    ]);
  });

  it('uses klisi filing date as anchor for protaseis after 2026', () => {
    const agogiFlow = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      klisi: false,
      exoterikou: false,
    });
    const klisiFlow = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      klisi: true,
      exoterikou: false,
    });

    expect(new Date(klisiFlow.protaseis).getTime()).toBeLessThan(
      new Date(agogiFlow.protaseis).getTime()
    );
    expect(klisiFlow.protaseisDetails?.imeres).toEqual([
      'Eντός 90 ημερών από την κατάθεση της κλήσης.',
    ]);
    expect(klisiFlow.protaseisDetails?.nomothesia[0]).toContain('Αρθ. 237 § 3');
    expect(klisiFlow.protaseisDetails?.nomothesia[0]).toContain(
      'κατάθεση της κλήσης για τον προσδιορισμό δικασίμου'
    );
  });

  it('uses 120 days for protaseis on klisi with foreign residence after 2026', () => {
    const klisiFlowForeign = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      klisi: true,
      exoterikou: true,
    });

    expect(klisiFlowForeign.protaseisDetails?.imeres).toEqual([
      'Eντός 120 ημερών από την κατάθεση της κλήσης.',
    ]);
  });

  it('keeps calculation metadata for derived deadlines after 2026', () => {
    const result = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: false,
    });

    expect(result.epidosiCalculation?.date).toBe(result.epidosi);
    expect(result.paremvasiCalculation?.date).toBe(result.paremvasi);
    expect(result.paremvasiCalculation?.logic.reference).toBe('epidosi');
    expect(result.paremvasiCalculation?.logic.start).toBe(result.epidosi);
    expect(result.paremvasiProsekCalculation?.logic.reference).toBe('epidosi');
    expect(result.paremvasiProsekCalculation?.logic.start).toBe(result.epidosi);
  });

  it('keeps paused and skipped metadata leg-local for post-2026 derived deadlines', () => {
    const result = prothesmiesNeasTaktikis('2026-01-08', {
      topiki: 'Αθηνών',
      exoterikou: true,
    });

    expect(result.epidosiCalculation?.skipped).toEqual([
      '2026-02-07',
      '2026-02-08',
    ]);
    expect(result.epidosiCalculation?.paused).toEqual([]);
    expect(result.paremvasiCalculation?.skipped).toEqual([]);
    expect(result.paremvasiCalculation?.paused).toEqual([]);
    expect(result.paremvasiProsekCalculation?.skipped).toEqual([]);
    expect(result.paremvasiProsekCalculation?.paused).toEqual([]);
  });
});
