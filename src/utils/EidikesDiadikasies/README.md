# Ειδικές Διαδικασίες (Special Procedures)

## Overview

This module handles deadline calculations for special civil procedure types in Greek courts. It provides automated calculation of critical deadlines, particularly the "prosthiki" (addition to pleadings) deadline that follows a court hearing.

## Supported Procedure Types

The following special procedure types (diadikasies) are supported:

- **ΑΜΟΙΒΕΣ** - Fees/Compensation cases
- **ΑΝΑΚΟΠΕΣ ΚΑΤΑ ΤΗΣ ΕΚΤΕΛΕΣΗΣ (Από Μετάπτωση)** - Opposition to Execution (From Transfer)
- **ΑΝΑΚΟΠΕΣ** - Oppositions
- **ΑΥΤΟΚΙΝΗΤΑ-ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ** - Automobile-Property Disputes
- **ΕΙΔΙΚΗ ΔΙΑ ΤΟΥ ΤΥΠΟΥ Τ.ΠΟΛ** - Special Procedure for Civil Code matters
- **ΕΚΟΥΣΙΑ ΜΟΝΟΜΕΛΟΥΣ** - Voluntary Jurisdiction (Single Judge)
- **ΕΡΓΑΤΙΚΑ-ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ** - Labor-Property Disputes
- **ΜΙΣΘΩΣΕΙΣ - ΠΕΡΙΟΥΣΙΑΚΕΣ ΔΙΑΦΟΡΕΣ** - Lease-Property Disputes
- **ΟΙΚΟΓΕΝΕΙΑΚΟ ΕΙΔΙΚΕΣ ΔΙΑΔΙΚΑΣΙΕΣ** - Family Law Special Procedures

## Business Logic

### Prerequisites for Deadline Calculation

For deadlines to be calculated, a civil case must meet **all** of the following conditions:

1. **Case Type**: The `diadikasia` field must be one of the supported special procedure types listed above
2. **Dikasimos Present**: The case must have a `dikasimos` (hearing date) value
3. **Case Heard**: The `apotelesma` (outcome) field must equal `'ΣΥΖΗΤΗΘΗΚΕ'` (meaning "discussed/heard")

### Behavior Based on Conditions

#### Case 1: No Dikasimos
```typescript
{ diadikasia: 'ΑΜΟΙΒΕΣ', apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ' }
// Missing dikasimos
```
**Result**: Returns empty array `[]`

No deadlines can be calculated without a hearing date.

---

#### Case 2: Dikasimos Present, But Case Not Heard
```typescript
{ diadikasia: 'ΑΜΟΙΒΕΣ', dikasimos: '2024-07-08', apotelesma: 'ΑΝΑΒΛΗΘΗΚΕ' }
// Case postponed
```
**Result**: Returns only the `dikasimos` deadline
```typescript
[{ type: 'dikasimos', date: '2024-07-08' }]
```

When the case is not heard (e.g., postponed, continued, or empty outcome), only the hearing date itself is returned as a deadline. No prosthiki deadline is calculated.

---

#### Case 3: Case Heard Successfully
```typescript
{ diadikasia: 'ΑΜΟΙΒΕΣ', dikasimos: '2024-07-08', apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ' }
// Case discussed successfully
```
**Result**: Returns both `dikasimos` and `prosthiki` deadlines
```typescript
[
  { type: 'dikasimos', date: '2024-07-08' },
  { type: 'prosthiki', date: '2024-07-15', ... }
]
```

## Prosthiki Deadline Calculation

### Legal Basis

The prosthiki deadline is based on **ΚΠολΔ 591 παρ. 1 περ. στ΄** (Greek Civil Procedure Code, Article 591, paragraph 1, clause f):

> "Οι διάδικοι μπορούν έως τη δωδέκατη ώρα της πέμπτης εργάσιμης ημέρας από τη συζήτηση να καταθέσουν προσθήκη στις προτάσεις τους..."

Translation: "The parties may, until the twelfth hour of the fifth working day from the hearing, file an addition to their pleadings..."

### Calculation Method

- **Duration**: 5 working days (εργάσιμες ημέρες)
- **Starting Point**: The dikasimos (hearing date)
- **Direction**: After the hearing date
- **Excluded Days**: Weekends, public holidays (argies), and court suspension periods (anastoli)

### Example Calculation

```
Dikasimos: Monday, July 8, 2024

Day 1: Tuesday, July 9
Day 2: Wednesday, July 10
Day 3: Thursday, July 11
Day 4: Friday, July 12
Day 5: Monday, July 15 (skips weekend: Sat 13th, Sun 14th)

Prosthiki Deadline: Monday, July 15, 2024
```

## Data Structure

### Input (Civil Case)
```typescript
{
  diadikasia: string;        // Procedure type
  dikasimos?: string;        // Hearing date (ISO format: YYYY-MM-DD)
  apotelesma: string;        // Case outcome
  court: string;             // Court name
  imerominia_katathesis: string; // Filing date
}
```

### Output (Deadline)
```typescript
{
  type: 'dikasimos' | 'prosthiki';
  date: string;              // ISO format: YYYY-MM-DD
  calculation?: {
    date: string;
    logic: {
      days: number;          // 5 working days
      when: 'after';
      reference: 'dikasimos';
      start: string;         // Dikasimos date
      name: string;          // 'Δικάσιμος'
    };
    paused: string[];        // Days excluded (weekends, holidays)
    skipped: string[];       // Should always be empty for working days
  };
  prosthikiDetails?: {
    nomothesia: string[];    // Legal articles
    ypologismos: string[];   // Calculation explanation
    imeres: string[];        // Duration description
    formattedNomothesia: {
      article: string;
      text: string;
      highlighted: string[];
    }[];
  };
}
```

## Usage

```typescript
import { prothesmiesCivilCase } from './civilCase/prothesmiesCivilCase';

const civilCase = {
  diadikasia: 'ΑΜΟΙΒΕΣ',
  court: 'ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ',
  imerominia_katathesis: '2024-07-01',
  dikasimos: '2024-07-08',
  apotelesma: 'ΣΥΖΗΤΗΘΗΚΕ',
};

const deadlines = prothesmiesCivilCase(civilCase);
// Returns: dikasimos and prosthiki deadlines with full calculation details
```

## Testing

Tests are located in `/test/prothesmiesEidikesDiadikasies.test.ts` and cover:

- Missing dikasimos scenarios
- Different apotelesma values (ΣΥΖΗΤΗΘΗΚΕ, ΑΝΑΒΛΗΘΗΚΕ, empty)
- All supported special procedure types
- Prosthiki calculation accuracy across weekends
- Calculation object structure and details
- Legal reference information (nomothesia)

Run tests with:
```bash
npm test prothesmiesEidikesDiadikasies
```

## Key Implementation Notes

1. **Working Days Only**: The prosthiki calculation uses `getDateErgasimesOnly()` which counts only working days, automatically excluding weekends, public holidays, and court suspension periods.

2. **Year-Specific Holidays**: Holiday calculation is year-specific using `argiesFunc(year)` and `anastoliFunc(year)` to ensure accurate exclusions.

3. **Validation**: The system validates that skipped days should always be empty when counting working days. Any non-empty skipped array triggers a console error.

4. **Detailed Tracking**: The calculation object tracks:
   - The final deadline date
   - The calculation logic (5 days after dikasimos)
   - Paused days (weekends, holidays excluded from counting)
   - Skipped days (should be empty; indicates errors if populated)

5. **Legal Documentation**: Each prosthiki deadline includes the relevant legal article (ΚΠολΔ 591) with highlighted key phrases for user reference.
