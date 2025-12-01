import { prothesmiesCivilCase } from '../src/civilCase/prothesmiesCivilCase';
import { prothesmiesEidikesDiadikasies } from '../src/utils/EidikesDiadikasies/prothesmiesEidikesDiadikasies';

describe('Υπολογισμός Προθεσμιών Ειδικών Διαδικασιών', () => {
  it('returns empty array when dikasimos is missing', () => {
    const civilCase = {
      diadikasia: 'ΑΜΟΙΒΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ',
    };
    const deadlines = prothesmiesCivilCase(civilCase);

    expect(deadlines).toEqual([]);
  });

  it('returns only dikasimos when apotelesma is not ΣΥΖΗΤΗΘΗΚΕ', () => {
    const civilCase = {
      diadikasia: 'ΑΜΟΙΒΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      dikasimos: '2024-07-08',
      apotelesma: 'ΑΝΑΒΛΗΘΗΚΕ',
    };
    const deadlines = prothesmiesCivilCase(civilCase);

    expect(deadlines.length).toBe(1);
    expect(deadlines[0].type).toBe('dikasimos');
    expect(deadlines[0].date).toBe('2024-07-08');
  });

  it('returns only dikasimos when apotelesma is empty', () => {
    const civilCase = {
      diadikasia: 'ΑΜΟΙΒΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      dikasimos: '2024-07-08',
      apotelesma: '',
    };
    const deadlines = prothesmiesCivilCase(civilCase);

    expect(deadlines.length).toBe(1);
    expect(deadlines[0].type).toBe('dikasimos');
    expect(deadlines[0].date).toBe('2024-07-08');
  });

  it('returns prosthiki deadline for all Eidikes Diadikasies when conditions are met', () => {
    const diadikasiesTypes = [
      'ΑΜΟΙΒΕΣ',
      'ΑΝΑΚΟΠΕΣ ΚΑΤΑ ΤΗΣ ΕΚΤΕΛΕΣΗΣ (Από Μετάπτωση)',
      'ΑΝΑΚΟΠΕΣ',
      'ΑΥΤΟΚΙΝΗΤΑ-ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ',
      'ΕΙΔΙΚΗ ΔΙΑ ΤΟΥ ΤΥΠΟΥ Τ.ΠΟΛ',
      'ΕΚΟΥΣΙΑ ΜΟΝΟΜΕΛΟΥΣ',
      'ΕΡΓΑΤΙΚΑ-ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ',
      'ΜΙΣΘΩΣΕΙΣ - ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ',
      'ΟΙΚΟΓΕΝΕΙΑΚΟ ΕΙΔΙΚΕΣ ΔΙΑΔΙΚΑΣΙΕΣ',
    ];

    diadikasiesTypes.forEach(diadikasia => {
      const civilCase = {
        diadikasia,
        court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
        imerominia_katathesis: '2024-07-01',
        dikasimos: '2024-07-08',  // Monday
        apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ',
      };
      const deadlines = prothesmiesCivilCase(civilCase);

      // Verify we get deadlines for this diadikasia type
      expect(deadlines.length).toBeGreaterThan(0);

      // Find prosthiki and dikasimos deadlines
      const prosthikiDeadline = deadlines.find(d => d.type === 'prosthiki');
      const dikasimosDeadline = deadlines.find(d => d.type === 'dikasimos');

      // Both should be defined
      expect(prosthikiDeadline).toBeDefined();
      expect(dikasimosDeadline).toBeDefined();

      // Verify dates
      expect(prosthikiDeadline?.date).toBe('2024-07-15'); // 5 working days after Monday
      expect(dikasimosDeadline?.date).toBe('2024-07-08');
    });
  });

  it('includes nomothesia and formattedNomothesia in prosthiki details', () => {
    const dikasimos = '2024-07-08';
    const result = prothesmiesEidikesDiadikasies(dikasimos);

    // Verify prosthikiDetails exists
    expect(result.prosthikiDetails).toBeDefined();

    // Verify nomothesia is populated
    expect(result.prosthikiDetails?.nomothesia.length).toBeGreaterThan(0);
    expect(result.prosthikiDetails?.nomothesia[0]).toContain('ΚΠολΔ 591 παρ. 1 περ. στ΄');

    // Verify formattedNomothesia is populated
    expect(result.prosthikiDetails?.formattedNomothesia.length).toBeGreaterThan(0);
    expect(result.prosthikiDetails?.formattedNomothesia[0].article).toBe('ΚΠολΔ 591 παρ. 1 περ. στ΄');
    expect(result.prosthikiDetails?.formattedNomothesia[0].highlighted.length).toBeGreaterThan(0);

    // Verify imeres is populated
    expect(result.prosthikiDetails?.imeres).toContain('5 εργάσιμες ημέρες από την συζήτηση.');
  });

  it('includes calculation object for prosthiki deadline', () => {
    const civilCase = {
      diadikasia: 'ΑΜΟΙΒΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      dikasimos: '2024-07-08',  // Monday
      apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ',
    };
    const deadlines = prothesmiesCivilCase(civilCase);

    const prosthikiDeadline = deadlines.find(d => d.type === 'prosthiki');

    // Verify calculation object exists and is properly structured
    expect(prosthikiDeadline?.calculation).toBeDefined();
    expect(prosthikiDeadline?.calculation?.date).toBe('2024-07-15');
    expect(prosthikiDeadline?.calculation?.logic).toEqual({
      days: 5,
      when: 'after',
      reference: 'dikasimos',
      start: '2024-07-08',
      name: 'Δικάσιμος',
    });
    // 2024-07-08 is Monday, counting 5 working days skips Sat (13th) and Sun (14th)
    expect(prosthikiDeadline?.calculation?.paused).toEqual(['2024-07-13', '2024-07-14']);
    expect(prosthikiDeadline?.calculation?.skipped).toEqual([]);
  });

  it('matches snapshot for complete deadlines array', () => {
    const civilCase = {
      diadikasia: 'ΑΜΟΙΒΕΣ',
      court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
      imerominia_katathesis: '2024-07-01',
      dikasimos: '2024-07-08',  // Monday
      apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ',
    };
    const deadlines = prothesmiesCivilCase(civilCase);

    expect(deadlines).toMatchSnapshot();
  });
});
