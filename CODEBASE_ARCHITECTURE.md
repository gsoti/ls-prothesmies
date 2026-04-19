# Prothesmies - Codebase Architecture Reference

> This document is designed for LLM coding agents working on this codebase. It provides a complete map of the project's structure, logic, conventions, and patterns so you can make changes confidently without extensive exploration.

## 1. Project Overview

**Prothesmies** (Greek: Προθεσμίες = "Deadlines") is a TypeScript library that calculates Greek court procedure deadlines. It computes when legal documents must be filed/served based on a starting date, while accounting for holidays, court suspensions, regional closures, and legislative changes.

- **Language**: TypeScript (strict mode, target ES2015)
- **Runtime**: Node.js >= 14, browsers
- **Dependencies**: Zero runtime dependencies
- **Build**: tsup (CJS + ESM + `.d.ts`)
- **Tests**: vitest
- **Size budget**: 20 KB per format (CJS, ESM)
- **Date format**: All dates are `YYYY-MM-DD` strings (ISO 8601). Native JS `Date` objects are used internally but never exposed in the public API.
- **Language of labels**: All user-facing strings (field names, legal citations, error messages) are in Greek.

---

## 2. Public API

**Entry point**: `src/index.ts`

Six functions are exported:

| Function | Module | Input | Purpose |
|---|---|---|---|
| `prothesmiesNeasTaktikis` | NeaTaktiki | `katathesi` (filing date) + `Options` | New ordinary civil procedure (Nea Taktiki) & special procedures (Eidikes) |
| `prothesmiesMikrodiaforon` | Mikrodiafores | `katathesi` + `Options` | Small claims procedure |
| `prothesmiesDiatPliromis` | DiatagesPliromis | `katathesi` + `Options` | Payment orders |
| `prothesmiesApopoiisis` | Apodochi | `apoviosi` (death date) + `Options` | Inheritance renunciation |
| `prothesmiesNDSte` | NeaDikonomiaSte | `katathesi` + `epidosi?` (string, not Options) | Administrative court (Council of State) |
| `prothesmiesYas` | Yas | `gnostopoiisi` (notification date) + `Options` | Mandatory mediation (YAS) |

### Shared Types

```typescript
// Each module has its OWN Options interface in its own Types/interfaces.ts
// They share similar fields but are NOT the same type

// NeaTaktiki Options (the most complete):
interface Options {
  dimosio?: boolean;      // State entity is a party
  dikasimos?: string;     // Known trial/hearing date (YYYY-MM-DD)
  exoterikou?: boolean;   // Party resides abroad
  yliki?: Yliki;          // Subject-matter jurisdiction
  topiki?: Topiki;        // Territorial jurisdiction (328 Greek court names)
  klisi?: boolean;        // Summons to resume vs. new lawsuit
  mode?: Mode;            // 'neataktiki' | 'eidikes'
}

// Mikrodiafores Options: dimosio, exoterikou, topiki, yliki
// DiatagesPliromis Options: dimosio, exoterikou, topiki, epidosiDone
// Apodochi Options: exoterikou, topiki
// Yas Options: exoterikou (only)
// NeaDikonomiaSte: NO options object (second param is epidosi string directly)

type Yliki = 'Ειρ' | 'Μον' | 'Πολ';  // Magistrate / Single-Member / Multi-Member
type Mode = 'neataktiki' | 'eidikes';
type Topiki = 'Αθηνών' | 'Θεσσαλονίκης' | ... | '';  // 328 Greek court locations

type DeadlineDetails = {
  nomothesia: string[];   // Legal provisions / law articles cited
  ypologismos: string[];  // Step-by-step calculation explanation
  imeres: string[];       // Human-readable day count / description
};
```

### Return Types by Function

**prothesmiesNeasTaktikis** returns:
- `katathesi`, `mode` — echo of inputs
- `epidosi` — service deadline
- `paremvasi` — intervention deadline
- `paremvasiProsek` — intervention extension
- `protaseis` — motions filing deadline
- `prosthiki` — supplementation deadline
- `dikasimos`, `dikasimosCalculated`, `dikasimosEarliest`, `dikasimosLatest` — trial date window (post-2026 only)
- `opsigeneis`, `opsigeneisAntikrousi` — late claims (pre-2026 only, requires dikasimos)
- `antikrousiArt269` — post-hearing rebuttal (post-2026 only, requires dikasimos)
- `*Details` — corresponding DeadlineDetails for each field

**prothesmiesMikrodiaforon** returns:
- `katathesi`, `epidosi`, `proskomidi`, `prosthiki`, `paremvasi`, `proskomidiParemv`, `prosthikiParemv` + `*Details`

**prothesmiesDiatPliromis** returns:
- `katathesi`, `epidosi`, `anakopi?` (only if `epidosiDone` option provided) + `*Details`

**prothesmiesApopoiisis** returns:
- `apoviosi`, `lixi` + `lixiDetails`

**prothesmiesNDSte** returns:
- `katathesi`, `prothesmiaEpidosis`, `epidosi?`, `apopseis?`, `prosthetoiLogoi?` + `*Details`

**prothesmiesYas** returns:
- `synedria`, `oloklirosi` + `synedriaDetails`, `oloklirosiDetails` (Details are always present, not optional)

---

## 3. Directory Structure

```
src/
├── index.ts                          # Re-exports all 6 main functions
└── utils/
    ├── NeaTaktiki/                    # New ordinary civil procedure
    │   ├── prothesmiesNeasTaktikis.ts # Main orchestrator (275 lines)
    │   ├── Types/interfaces.ts        # Options, Topiki, Yliki, Mode types
    │   ├── Anastoles/                 # Suspension rules
    │   │   ├── anastoliDimosiou.ts    # State entity summer suspension (Jul 1-31, Sep 1-15)
    │   │   ├── anastolesAnaPeriohi.ts # Regional COVID lockdown suspensions
    │   │   ├── prosthikiHmeron2021.ts # Additional days for specific 2021 closures
    │   │   ├── prosthikiHmeronBarbara.ts  # Storm Barbara (2023) additions
    │   │   └── prosthikiHmeronDaniel.ts   # Storm Daniel (2023) additions
    │   └── Categories/
    │       ├── epidosi/               # Service deadline
    │       │   ├── getEpidosi.ts      # Calculates date
    │       │   ├── getEpidosiDays.ts  # Returns day count (30 or 60)
    │       │   └── getEpidosiDetails.ts # Legal explanation
    │       ├── paremvasi/             # Intervention
    │       ├── paremvasiProsek/       # Intervention extension
    │       ├── protaseis/             # Motions filing
    │       ├── prosthiki/             # Supplementation
    │       ├── opsigeneis/            # Late claims (pre-2026 only)
    │       ├── opsigeneisAntikrousi/  # Late counterarguments (pre-2026 only)
    │       └── dikasimos/             # Trial date window calculation (post-2026)
    │           ├── getDikasimosWindow.ts
    │           ├── getDikasimosDetails.ts
    │           └── getSummerSuspensionDates.ts
    │
    ├── Mikrodiafores/                 # Small claims
    │   ├── prothesmiesMikrodiaforon.ts
    │   ├── Types/interfaces.ts
    │   ├── Anastoles/anastoliDimosiou.ts
    │   └── Categories/
    │       ├── epidosi/
    │       ├── proskomidi/            # Document lodging
    │       ├── prosthiki/             # Supplementation
    │       ├── paremvasi/             # Intervention
    │       ├── proskomidiParemvasis/  # Intervention lodging
    │       └── prosthikiParemvasis/   # Intervention supplementation
    │
    ├── DiatagesPliromis/              # Payment orders
    │   ├── prothesmiesDiatPliromis.ts
    │   ├── Types/interfaces.ts        # Has unique epidosiDone field
    │   ├── Anastoles/anastoliDimosiou.ts
    │   └── Categories/
    │       ├── epidosi/
    │       └── anakopi/               # Opposition deadline
    │
    ├── Apodochi/                      # Inheritance renunciation
    │   ├── prothesmiesApopoiisis.ts
    │   ├── Types/interfaces.ts
    │   ├── Anastoles/anastoliDimosiou.ts
    │   └── Categories/lixi/           # Expiry deadline (4 months domestic / 12 abroad)
    │
    ├── NeaDikonomiaSte/               # Administrative court (Council of State)
    │   ├── prothesmiesNDSte.ts
    │   ├── Types/interfaces.ts
    │   ├── Anastoles/anastoliDimosiou.ts
    │   └── Categories/
    │       ├── lixi/                  # Service deadline (called "lixi" here)
    │       ├── apopseisDioikisis/     # Administration's opinions deadline
    │       └── prosthetoiLogoi/       # Supplementary grounds deadline
    │
    ├── Yas/                           # Mandatory mediation (YAS)
    │   ├── prothesmiesYas.ts
    │   ├── Types/interfaces.ts        # Only has exoterikou field
    │   ├── Anastoles/anastoliDimosiou.ts
    │   └── Categories/
    │       ├── synedria/              # Session deadline (20/30 days)
    │       └── oloklirosi/            # Completion deadline (40 days from synedria)
    │
    ├── CalculateDates/                # Core date arithmetic engine
    │   └── calculateDate.ts
    │
    ├── ArgiesAndAnastoli/             # Holidays & court suspension generation
    │   ├── ArgiesFunc.ts              # Combines moveable + fixed holidays for a year range
    │   ├── KinitesFunc.ts             # Moveable holidays (Easter-based, Meeus/Jones/Butcher)
    │   ├── StatheresFunc.ts           # Fixed holidays + all weekends
    │   ├── AnastoliFunc.ts            # August court suspension (Aug 1-31)
    │   ├── Anastoli.ts                # Static suspension data
    │   ├── Argies.ts                  # Static holiday data (sample)
    │   └── extraArgies.ts             # Additional non-standard holidays
    │
    ├── Dikastiria/                    # Court registry & regional suspensions
    │   ├── dikastiria.ts              # Full court hierarchy + getAnastolesAnaDikastirio()
    │   ├── codes.ts                   # Court numeric codes
    │   └── getCode.ts                 # Code lookup utility
    │
    ├── LegalAnalysis/                 # Court closure periods with legal references
    │   └── legalAnalysis.ts           # Arrays of closure data: COVID, storms, etc.
    │
    └── Various/                       # General utilities
        ├── addAndRemoveDays.ts        # addArgAndAnastDays(), removeArgAndAnastDays()
        ├── addZeroToNumber.ts         # Pads single digits: 5 -> '05'
        ├── checkEarlierOrLaterDate.ts # earlierThan(), laterThan(), date window checks
        ├── checkValidDate.ts          # Validates YYYY-MM-DD format
        ├── removeArgies.ts            # Filters holidays from date arrays
        ├── returnDatesBetween.ts      # All dates in a range as string[]
        └── reverseDate.ts             # Date format conversion
```

**Test files**: `test/*.test.ts`
- `prothesmiesNeasTaktikis.test.ts` — 10 test cases for neataktiki mode
- `prothesmiesNeasTaktikis.eidikes.test.ts` — 4 test cases for eidikes mode

**Config files** (root):
- `package.json`, `tsconfig.json`, `tsup.config.ts`, `vitest.config.ts`

---

## 4. Core Architecture Patterns

### 4.1 Deadline Calculation Pipeline

Every deadline follows this pipeline:

```
1. Get base day count (e.g., 30 days for epidosi)
      ↓
2. Assemble argiesAndAnastoli object:
   - argies: holidays (moveable + fixed + weekends + extra)
   - anastoli: court suspensions (August + state sector + regional + storm/COVID closures)
      ↓
3. Call getDate() / getDateErgasimesOnly() / addMonths() from CalculateDates
   - These skip suspension days (anastoli) when counting
   - If the final date lands on a holiday/suspension, advance to next valid day
      ↓
4. Return date as YYYY-MM-DD string
```

### 4.2 The Category Module Pattern

Each deadline category follows a consistent three-file structure:

```
Categories/<deadlineName>/
├── get<Name>.ts           # Main calculation: (startDate, options) -> date string
├── get<Name>Days.ts       # Day count logic: (startDate, flags) -> number
│                          #   (sometimes called get<Name>AddedDays.ts)
└── get<Name>Details.ts    # Legal explanation: (start, result, options) -> DeadlineDetails
```

The `get<Name>.ts` file always:
1. Gets the day count from `get<Name>Days.ts`
2. Builds the `argiesAndAnastoli` object using `argiesFunc()`, `anastoliFunc()`, etc.
3. Calls `getDate()` or similar from CalculateDates
4. Returns `date.toISOString().split('T')[0]`

### 4.3 The argiesAndAnastoli Pattern

All date calculation functions accept this parameter:

```typescript
{ argies: string[]; anastoli: string[] }
```

- **argies** = holidays (including weekends). The final date cannot land on an argia; it gets pushed forward.
- **anastoli** = court suspension dates. These days are skipped entirely when counting (they don't count as elapsed days).

Both are arrays of `YYYY-MM-DD` strings.

### 4.4 Key Date Calculation Functions

In `src/utils/CalculateDates/calculateDate.ts`:

| Function | Description |
|---|---|
| `getDate(start, days, argiesAndAnastoli)` | Adds N days, skipping anastoli days. If result falls on argia/anastoli, pushes forward. |
| `getDateErgasimesOnly(start, days, argiesAndAnastoli)` | Adds N business days, skipping BOTH argies AND anastoli. |
| `getDateReverse(start, days, argiesAndAnastoli)` | Same as getDate but counts backwards. |
| `addMonths(start, months, argiesAndAnastoli)` | Adds N months, then adjusts for anastoli days in the range. |
| `analyseArgies(start, days, argiesAndAnastoli)` | Returns the first argia that the deadline would have fallen on (for Details explanations). |

**Important distinction**: `getDate` skips only anastoli when counting, then pushes past argies at the end. `getDateErgasimesOnly` skips both argies AND anastoli when counting.

### 4.5 Holiday & Suspension Generation

| Function | File | Returns |
|---|---|---|
| `argiesFunc(year?)` | ArgiesAndAnastoli/ArgiesFunc.ts | All holidays for year-1 through year+1 (or 2015-2034 if no year). Includes moveable (Easter), fixed, and ALL weekends. |
| `kinitesArgiesFunc(year)` | ArgiesAndAnastoli/KinitesFunc.ts | Easter-based moveable holidays for a year. Uses Meeus/Jones/Butcher algorithm. |
| `statheresArgiesFunc(year)` | ArgiesAndAnastoli/StatheresFunc.ts | Fixed national holidays + every Saturday and Sunday for that year. |
| `anastoliFunc(year?)` | ArgiesAndAnastoli/AnastoliFunc.ts | All dates in August (Aug 1-31) for relevant years. This is the general court summer recess. |
| `anastoliDimosiouFunc()` | Each module's Anastoles/ | State entity summer suspension: Jul 1-31 and Sep 1-15 (with some year-specific exceptions). |
| `getAnastolesAnaDikastirio(topiki, eidos, yliki)` | Dikastiria/dikastiria.ts | Regional court-specific suspension dates (COVID lockdowns, storm closures). |
| `extraArgies` | ArgiesAndAnastoli/extraArgies.ts | Additional non-standard holiday dates. |

### 4.6 Orchestrator Pattern

Each main function (`prothesmiesNeasTaktikis`, etc.) follows this pattern:

1. Destructure options with defaults (e.g., `topiki = 'Αθηνών'`, `exoterikou = false`)
2. Build `optionsDefault` object
3. Call each category's `get<Name>()` function sequentially (some depend on previous results)
4. Call each category's `get<Name>Details()` function
5. Assemble and return the result object

---

## 5. Business Logic: Pre-2026 vs Post-2026 (N. 5221/2025)

The constant `N5221_EFFECTIVE_DATE = '2026-01-01'` controls the legal regime. The function `isPostN5221(date)` checks if a filing date falls under the new law.

### What changed with N. 5221/2025:

| Aspect | Pre-2026 | Post-2026 |
|---|---|---|
| Epidosi (service) days | 30 domestic, 60 abroad | 30 for both |
| Paremvasi anchor | Counted from katathesi | Counted from epidosi |
| Paremvasi days | 60 domestic, 90 abroad | 40 domestic, 70 abroad |
| Opsigeneis (late claims) | 20 days before dikasimos | ABOLISHED |
| OpsigeneisAntikrousi | 10 days before dikasimos | ABOLISHED |
| AntikrousiArt269 | N/A | 5 business days AFTER dikasimos (hearing) |
| Dikasimos window | Not computed | 200-210 days (domestic) or 9-10 months (abroad) |
| Summer suspension for dikasimos | N/A | Jul 1 - Sep 15 |
| Eidikes mode | Not available | New mode for special procedures (Art. 215 § 2) |

### Eidikes Mode

When `mode === 'eidikes'`:
- Only available for `katathesi >= '2026-01-01'` (throws error otherwise)
- `paremvasi` and `paremvasiProsek` return empty strings (not applicable)
- `protaseis` = dikasimos date (filed at hearing)
- `prosthiki` = 5 business days after dikasimos (only if dikasimos is provided)
- Epidosi is always 30 days (same for domestic and abroad)

### Code Flow for the Branching

In `prothesmiesNeasTaktikis.ts`:
1. If `mode === 'eidikes'` → early return with eidikes-specific logic (line 105-178)
2. Otherwise, compute all standard deadlines (line 180-243)
3. If `dikasimos` is provided AND `isPostN5221(katathesi)` → compute `antikrousiArt269` (5 business days after dikasimos)
4. If `dikasimos` is provided AND pre-2026 → compute `opsigeneis` and `opsigeneisAntikrousi`

---

## 6. Module-by-Module Reference

### 6.1 NeaTaktiki (New Ordinary Civil Procedure)

**File**: `src/utils/NeaTaktiki/prothesmiesNeasTaktikis.ts`
**Options**: dimosio, dikasimos, exoterikou, yliki, topiki, klisi, mode
**Defaults**: topiki='Αθηνών', yliki='Μον', mode='neataktiki'

**Deadline chain** (neataktiki mode):
```
katathesi → epidosi → paremvasi, paremvasiProsek
katathesi → protaseis → prosthiki
dikasimos → opsigeneis, opsigeneisAntikrousi (pre-2026)
dikasimos → antikrousiArt269 (post-2026)
katathesi → dikasimosWindow (post-2026)
```

**Validation**: eidikes mode throws if `katathesi < '2026-01-01'`. No other input validation.

### 6.2 Mikrodiafores (Small Claims)

**File**: `src/utils/Mikrodiafores/prothesmiesMikrodiaforon.ts`
**Options**: dimosio, exoterikou, topiki, yliki
**Defaults**: topiki='Αθηνών'

**Deadline chain**:
```
katathesi → epidosi → proskomidi → prosthiki
katathesi → paremvasi
katathesi → proskomidiParemv → prosthikiParemv
```

**No input validation** (no checkValidDate, no minimum date).

### 6.3 DiatagesPliromis (Payment Orders)

**File**: `src/utils/DiatagesPliromis/prothesmiesDiatPliromis.ts`
**Options**: dimosio, exoterikou, topiki, epidosiDone
**Defaults**: topiki='Αθηνών'

**Validation**: checkValidDate + minimum date `>= '2022-02-01'`
**Conditional**: `anakopi` only computed if `options.epidosiDone` is provided.

### 6.4 Apodochi (Inheritance Renunciation)

**File**: `src/utils/Apodochi/prothesmiesApopoiisis.ts`
**Input**: `apoviosi` (death date), not `katathesi`
**Options**: exoterikou, topiki
**Validation**: checkValidDate + minimum date `>= '2022-02-01'`
**Deadlines**: Just `lixi` (4 months domestic, 12 months abroad)

### 6.5 NeaDikonomiaSte (Administrative Court)

**File**: `src/utils/NeaDikonomiaSte/prothesmiesNDSte.ts`
**Input**: `katathesi` + optional `epidosi` string (NO Options object)
**Validation**: checkValidDate + minimum date `>= '2024-09-16'`
**Always applies state suspension** (Jul 1 - Sep 15) since it's always against the state.

**Deadlines**:
- `prothesmiaEpidosis` — always computed
- `apopseis`, `prosthetoiLogoi` — only if `epidosi` param is provided

### 6.6 Yas (Mandatory Mediation)

**File**: `src/utils/Yas/prothesmiesYas.ts`
**Input**: `gnostopoiisi` (notification date)
**Options**: exoterikou (only field)
**Validation**: checkValidDate + minimum date `>= '2015-01-01'`

**Deadlines**:
- `synedria` = 20 days (domestic) / 30 days (abroad) from notification
- `oloklirosi` = 40 days from synedria
- Details are always present (not optional)

---

## 7. Important Data Files

### 7.1 Dikastiria (Court Registry)

`src/utils/Dikastiria/dikastiria.ts` contains the full hierarchy of Greek courts:
- **Efeteia** (Appeals Courts) → lists of **Protodikeio** (First Instance Courts) → lists of **Eirinodikeia** (Magistrate Courts)
- Key function: `getAnastolesAnaDikastirio(topiki, eidos, yliki)` — returns suspension dates for a specific court based on COVID lockdowns, storm closures, etc.
- Also contains: `barbaraGetAnastolesAnaDikastirio()`, `danielGetAnastolesAnaDikastirio()` for storm-specific suspensions.

### 7.2 LegalAnalysis

`src/utils/LegalAnalysis/legalAnalysis.ts` contains arrays of court closure period objects:
```typescript
{
  fek: string;           // Official Government Gazette reference
  periohes: string[];    // Affected regions (or ['all'])
  exceptions: string[];  // Regions excluded from closure
  text: string;          // Legal explanation (Greek)
  dates_start: string;   // Start of closure (YYYY-MM-DD)
  dates_end: string;     // End of closure (YYYY-MM-DD)
  eidos: string;         // Affected procedure type ('all', 'epidosi', etc.)
}
```

Multiple analysis arrays: `legalAnalysis`, `barbaraLegalAnalysis`, `danielLegalAnalysis`.

---

## 8. Conventions for Contributors

### Naming
- All deadline field names use transliterated Greek: epidosi, paremvasi, protaseis, prosthiki, opsigeneis, dikasimos, etc.
- Category directory names match the field names exactly.
- "Details" suffix for explanation objects (e.g., `epidosiDetails`).

### File Organization
- Each procedure type has its own directory under `src/utils/`.
- Each procedure directory contains: main orchestrator, `Types/interfaces.ts`, `Anastoles/`, `Categories/`.
- Each category has the three-file pattern: `get<Name>.ts`, `get<Name>Days.ts` (or `AddedDays`), `get<Name>Details.ts`.

### Options Pattern
- Each module defines its OWN `Options` interface in its own `Types/interfaces.ts`. They are not shared.
- The `Topiki` type (328 court names) is duplicated in each module's interfaces file.
- Defaults are set at the top of each orchestrator function, not in the interfaces.

### Date Handling
- Always `YYYY-MM-DD` strings at API boundaries.
- `.toISOString().split('T')[0]` for Date-to-string conversion.
- `new Date(dateString).getTime()` for comparisons.
- Millisecond arithmetic: `24 * 60 * 60 * 1000` = one day (also `24 * 3600 * 1000`).
- Year extraction: `parseInt(dateString.slice(0, 4))`.

### Error Messages
- All in Greek.
- Format validation: `"Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2022-04-28')"`
- Date range validation: `'Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα.'`

---

## 9. Testing

**Framework**: vitest
**Run**: `npm test` or `npx vitest run`
**Config**: `vitest.config.ts`

**Test files**:
- `test/prothesmiesNeasTaktikis.test.ts` — Tests for neataktiki mode (post-2026 dikasimos caps, suspension adjustments, foreign residence, klisi behavior)
- `test/prothesmiesNeasTaktikis.eidikes.test.ts` — Tests for eidikes mode (pre-2026 throws, uniform 30-day service, conditional prosthiki)

**Test patterns**:
- Uses `describe`/`it` blocks with descriptive names.
- Helper function `addDaysIso(date, days)` for expected date arithmetic in tests.
- Strict equality assertions on date strings.
- Tests both pre-2026 and post-2026 behavior.
- Tests validate Details object structure.

---

## 10. Build & Distribution

**Build command**: `npm run build` (tsup)
**Watch mode**: `npm start` (tsup --watch)
**Output**:
- `dist/index.js` — CommonJS
- `dist/index.mjs` — ESM
- `dist/index.d.ts` / `dist/index.d.mts` — Type declarations
- Source maps included

**Size check**: `npm run size` (size-limit, max 20 KB each)

**Published package** (`npm`):
- `name`: "prothesmies"
- `main`: dist/index.js
- `module`: dist/index.mjs
- `typings`: dist/index.d.ts
- Includes `dist/` and `src/` in published files

---

## 11. Quick Reference: Adding a New Deadline to an Existing Module

1. Create a new category directory: `src/utils/<Module>/Categories/<newDeadline>/`
2. Add three files following the pattern:
   - `get<Name>.ts` — calculation logic
   - `get<Name>Days.ts` or `get<Name>AddedDays.ts` — day count
   - `get<Name>Details.ts` — legal explanation returning `DeadlineDetails`
3. Import and call from the module's orchestrator file
4. Add the field + Details to the return interface
5. Add tests in `test/`

## 12. Quick Reference: Adding a New Procedure Module

1. Create directory: `src/utils/<NewModule>/`
2. Create `Types/interfaces.ts` with module-specific `Options` (copy Topiki from existing)
3. Create `Anastoles/anastoliDimosiou.ts` if state party suspension applies
4. Create `Categories/` subdirectories with the three-file pattern
5. Create main orchestrator: `prothesmies<NewModule>.ts`
6. Export from `src/index.ts`
7. Add tests in `test/`
