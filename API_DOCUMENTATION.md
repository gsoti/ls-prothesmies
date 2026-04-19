# `prothesmies` API Documentation

Greek legal deadline calculator for civil, administrative, and mediation procedures.

## Installation

```bash
npm i prothesmies
```

```ts
// ESM
import {
  prothesmiesNeasTaktikis,
  prothesmiesMikrodiaforon,
  prothesmiesDiatPliromis,
  prothesmiesApopoiisis,
  prothesmiesNDSte,
  prothesmiesYas,
} from 'prothesmies';

// CJS
const {
  prothesmiesNeasTaktikis,
  prothesmiesMikrodiaforon,
  prothesmiesDiatPliromis,
  prothesmiesApopoiisis,
  prothesmiesNDSte,
  prothesmiesYas,
} = require('prothesmies');
```

Zero dependencies. Works in browser and Node.js (>=14).

## Date Format

All dates throughout the API use **`YYYY-MM-DD`** strings (e.g. `'2026-03-15'`).

---

## Shared Types

### `DeadlineDetails`

Every `*Details` field in every return type uses this structure:

```ts
type DeadlineDetails = {
  nomothesia: string[];   // Legal provisions / legislation citations
  ypologismos: string[];  // Calculation notes (e.g. "holiday on X, shifted to next business day")
  imeres: string[];       // Human-readable day-count explanation
};
```

### `Yliki` (Subject-matter Jurisdiction)

```ts
type Yliki = 'Ειρ' | 'Μον' | 'Πολ';
```

| Value | Court |
|-------|-------|
| `'Ειρ'` | Eirinodikio (Magistrate's Court) |
| `'Μον'` | Monomeles Protodikeio (Single-Member First Instance) |
| `'Πολ'` | Polymeles Protodikeio (Multi-Member First Instance) |

### `Mode`

```ts
type Mode = 'neataktiki' | 'eidikes';
```

| Value | Meaning |
|-------|---------|
| `'neataktiki'` | New Regular Procedure (Nea Taktiki) |
| `'eidikes'` | Special Procedures (Eidikes Diadikasies) -- **post-2026 filings only** |

### `Topiki` (Territorial Jurisdiction)

Union of 316 Greek court jurisdictions plus `''` (empty string). Default is always `'Αθηνών'`. Used to determine region-specific court suspensions (COVID lockdowns, Storm Barbara, Storm Daniel, etc.).

<details>
<summary>Full list of Topiki values (click to expand)</summary>

```
'Άμφισσας' | 'Άνδρου' | 'Άργους' | 'Άρτας' | 'Άστρους' | 'Έβρου' | 'Έδεσσας' | 'Ίου'
| 'Αγίας Άννας' | 'Αγίου Νικολάου' | 'Αγραίων' | 'Αγρινίου' | 'Αγυιάς' | 'Αθηνών'
| 'Αιγίνης' | 'Αιγίου' | 'Αιγιαλείας' | 'Αιτωλικού' | 'Ακράτας' | 'Αλεξάνδρειας'
| 'Αλεξανδρούπολης' | 'Αλιάρτου' | 'Αλμυρού' | 'Αλμωπίας' | 'Αμαλιάδας' | 'Αμαρoυσίoυ'
| 'Αμαρίου' | 'Αμβρυσσού' | 'Αμοργού' | 'Αμυνταίου' | 'Αμφίκλειας' | 'Ανασελίτσης'
| 'Ανδρίτσαινης' | 'Απεραντίων' | 'Αποδοτίας' | 'Απολλωνίων' | 'Αράχωβας' | 'Αρήνης'
| 'Αργαλαστής' | 'Αργοστολίου' | 'Αρκαλοχωρίου' | 'Αρναίας' | 'Αροανίας' | 'Αστυπάλαιας'
| 'Αταλάντης' | 'Αυλωναρίου' | 'Αχαρνών' | 'Βάλτου' | 'Βάμου' | 'Βάρδας' | 'Βέροιας'
| 'Βαρθολομιού' | 'Βασιλικών' | 'Βιάννου' | 'Βολισσού' | 'Βονίτσας' | 'Βόλου'
| 'Γαστούνης' | 'Γιαννιτσών' | 'Γουμένισσας' | 'Γρεβενών' | 'Γυθείου' | 'Δαυλείας'
| 'Δελφών' | 'Δερβενίου' | 'Δεσκάτης' | 'Διδυμοτείχου' | 'Δικαίων' | 'Δομοκού'
| 'Δράμας' | 'Δροσοπηγής' | 'Δωρίδος' | 'Δωρίου' | 'Δωριέων' | 'Δύμης' | 'Ελάτειας'
| 'Ελασσόνας' | 'Ελευσίνας' | 'Ελευσίνας Πελοποννήσου' | 'Εορδαίας'
| 'Επιδαύρου-Λιμηράς' | 'Εράνης' | 'Ερεσσού' | 'Ερινεού' | 'Ερμούπολης' | 'Ερυθρών'
| 'Ευδήλου' | 'Ευπαλίου' | 'Ευρυτανίας' | 'Εχίνου' | 'Ζίτσης' | 'Ζαγοράς' | 'Ζαγορίου'
| 'Ζακύνθου' | 'Ηγουμενίτσας' | 'Ηλείας' | 'Ηράκλειας' | 'Ηρακλείου' | 'Θάσου'
| 'Θέρμου' | 'Θήρας' | 'Θίσβης' | 'Θερμοπυλών' | 'Θεσπιών' | 'Θεσπρωτίας'
| 'Θεσπρωτικού' | 'Θεσσαλονίκης' | 'Θηβών' | 'Ιεράπετρας' | 'Ιερισσού' | 'Ιθάκης'
| 'Ικαρίας' | 'Ιστιαίας' | 'Ιτέας' | 'Ιωαννίνων' | 'Κέρκυρας' | 'Καβάλας'
| 'Καλαβρύτων' | 'Καλαμάτας' | 'Καλαμπάκας' | 'Καλαυρίας' | 'Καλεντίνης' | 'Καλλιθέας'
| 'Καλλονής' | 'Καλύμνου' | 'Καντάνου' | 'Καρδίτσας' | 'Καρλοβασίου' | 'Καρπάθου'
| 'Καρυταίνης' | 'Καρύστου' | 'Κασσάνδρας' | 'Καστελίου-Κισσάμου'
| 'Καστελίου-Πεδιάδος' | 'Καστορίου' | 'Καστοριάς' | 'Κατερίνης' | 'Κεφαλληνίας'
| 'Κιλκίς' | 'Κισσάβου' | 'Κλεισούρας' | 'Κλειτορίας' | 'Κοζάνης' | 'Κολινδρού'
| 'Κολυμβαρίου' | 'Κομοτηνής' | 'Κονίτσης' | 'Κορίνθου' | 'Κουφαλίων' | 'Κρεστένων'
| 'Κροκεών' | 'Κρωπίας' | 'Κρύας Βρύσης' | 'Κυθήρων' | 'Κυπαρισσίας' | 'Κω'
| 'Κύθνου' | 'Κύμης' | 'Λάρισας' | 'Λέρου' | 'Λίμνης' | 'Λαγκαδά' | 'Λαμίας'
| 'Λαμπείας' | 'Λασιθίου' | 'Λαυρίoυ' | 'Λευκάδας' | 'Λευκίμης' | 'Ληξουρίου'
| 'Λιβαδειάς' | 'Μάσσητος' | 'Μήλου' | 'Μακρακώμης' | 'Μακρυνείας' | 'Μαραθώvoς'
| 'Μεγάρωv' | 'Μεγίστης' | 'Μεγαλόπολης' | 'Μεσολογίου' | 'Μετσόβου' | 'Μηλέων'
| 'Μοιρών' | 'Μουζακίου' | 'Μουριών' | 'Μυκόνου' | 'Μυλοποτάμου' | 'Μυρτουντίων'
| 'Μυτιλήνης' | 'Ν. Iωvίας' | 'Ν. Λιoσίωv' | 'Ν.Επιδαύρου' | 'Ν.Μουδανιών'
| 'Νάξου' | 'Νάουσας' | 'Νέστου' | 'Νίκαιας' | 'Ναυπάκτου' | 'Ναυπλίου'
| 'Νεαπόλεως' | 'Νεαπόλεως Βοιών' | 'Νεμέας' | 'Νεστορίου' | 'Νευροκοπίου'
| 'Νιγρίτας' | 'Νισύρου' | 'Νυμφασίας' | 'Ξάνθης' | 'Ξηρομέρου' | 'Ξυλοκάστρου'
| 'Οιχαλίας' | 'Ολυμπίων' | 'Ολύμπου' | 'Ορεστιάδας' | 'Ορχομενού' | 'Πάργας'
| 'Πάρου' | 'Πάτμου' | 'Παγγαίου' | 'Παλαμά' | 'Παμίσου' | 'Παξών' | 'Παπάδου'
| 'Παραμυθιάς' | 'Παραχελωΐτιδος' | 'Πατρών' | 'Πειραιά' | 'Πενταλόφου'
| 'Περιστερίoυ' | 'Πιερίας' | 'Πλαταμώδους' | 'Πλωμαρίου' | 'Πολυγύρου'
| 'Πολυκάστρου' | 'Πολυχνίτου' | 'Πορροΐων' | 'Πρέβεζας' | 'Πρασσιών' | 'Πρεσπών'
| 'Προσχίου' | 'Προσωτσάνης' | 'Πωγωνίου' | 'Πύλου' | 'Πύργου' | 'Πύργου Κρήτης'
| 'Πύρρας' | 'Ρεθύμνης' | 'Ροδολίβους' | 'Ροδόπης' | 'Ρόδου' | 'Σάμου' | 'Σίφνου'
| 'Σαλαμίνας' | 'Σαμαίων' | 'Σαμοθράκης' | 'Σαππών' | 'Σερίφου' | 'Σερβίων'
| 'Σερρών' | 'Σητείας' | 'Σιατίστης' | 'Σικυώνος' | 'Σκιάθου' | 'Σκοπέλου'
| 'Σκύδρας' | 'Σκύρου' | 'Σολίου' | 'Σουφλίου' | 'Σοφάδων' | 'Σπάρτης'
| 'Σπερχειάδας' | 'Σπετσών' | 'Σπηλίου' | 'Σταυρούπολης' | 'Στυμφαλίας' | 'Συκιάς'
| 'Συντίκης' | 'Σωχού' | 'Σύμης' | 'Σύρου' | 'Τήνου' | 'Ταμινέων'
| 'Τανίας Δολανών' | 'Τευθίδος' | 'Τζερμιάδων' | 'Τζουμέρκων' | 'Τολοφώνος'
| 'Τρίπολης' | 'Τραγαίας' | 'Τρικάλων' | 'Τριταίας' | 'Τροπαίων' | 'Τυρνάβου'
| 'Υπάτης' | 'Φαλάρων' | 'Φαρκαδόνος' | 'Φαρρών' | 'Φαρσάλων' | 'Φενεού' | 'Φερών'
| 'Φιλιατών' | 'Φιλιππιάδας' | 'Φλεσιάδος' | 'Φλώρινας' | 'Φυγαλείας' | 'Φυλλίδος'
| 'Χίου' | 'Χαλαvδρίoυ' | 'Χαλκίδας' | 'Χαλκιδικής' | 'Χανίων' | 'Χερσονήσσου'
| 'Χρυσούπολη' | 'Χώρας Σφακίων' | 'Ψωφίδος' | 'Ωλένης' | ''
```

</details>

---

## 1. `prothesmiesNeasTaktikis`

New ordinary civil procedure (Nea Taktiki Diadikasia, Art. 237-238 CPC) and special procedures (Eidikes Diadikasies, N. 5221/2025).

### Signature

```ts
function prothesmiesNeasTaktikis(
  katathesi: string,
  options?: Options
): ProthesmiesNeasTaktikis;
```

### Parameters

**`katathesi`** (`string`, required) -- Filing date of the lawsuit. Format: `'YYYY-MM-DD'`.

**`options`** (optional):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimosio` | `boolean` | `false` | State/public entity is a party. Extends suspension period to Jul 1 - Sep 15 (instead of Aug 1-31). |
| `dikasimos` | `string` | `undefined` | Hearing date (`'YYYY-MM-DD'`). Enables opsigeneis/antikrousi calculations. |
| `exoterikou` | `boolean` | `false` | Party resides abroad or has unknown residence. Extends various deadlines. |
| `yliki` | `Yliki` | `'Μον'` | Subject-matter jurisdiction (court level). |
| `topiki` | `Topiki` | `'Αθηνών'` | Territorial jurisdiction. Determines region-specific suspensions. |
| `klisi` | `boolean` | `false` | `true` if this is a summons (klisi) rather than a new lawsuit (agogi). Affects protaseis calculation. |
| `mode` | `Mode` | `'neataktiki'` | `'neataktiki'` for regular procedure, `'eidikes'` for special procedures. |

### Return Type

```ts
interface ProthesmiesNeasTaktikis {
  katathesi: string;                          // Echo of input filing date
  epidosi: string;                            // Service of process deadline
  paremvasi: string;                          // Third-party intervention deadline
  paremvasiProsek: string;                    // Intervention after joinder deadline
  protaseis: string;                          // Written briefs deadline
  prosthiki: string;                          // Addendum/rebuttal deadline
  mode?: Mode;                                // 'neataktiki' | 'eidikes'
  dikasimos?: string;                         // Hearing date (from options, or undefined)
  dikasimosCalculated?: string;               // Computed hearing date (post-2026)
  dikasimosEarliest?: string;                 // Earliest hearing date (post-2026, exoterikou)
  dikasimosLatest?: string;                   // Latest hearing date (post-2026)
  opsigeneis?: string;                        // Late claims deadline (pre-2026 only)
  opsigeneisAntikrousi?: string;              // Rebuttal to late claims (pre-2026 only)
  antikrousiArt269?: string;                  // Post-hearing rebuttal (post-2026 only)
  epidosiDetails?: DeadlineDetails;
  paremvasiDetails?: DeadlineDetails;
  paremvasiProsekDetails?: DeadlineDetails;
  protaseisDetails?: DeadlineDetails;
  prosthikiDetails?: DeadlineDetails;
  opsigeneisDetails?: DeadlineDetails;
  opsigeneisAntikrousiDetails?: DeadlineDetails;
  antikrousiArt269Details?: DeadlineDetails;
  dikasimosCalculationDetails?: DeadlineDetails;
}
```

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `katathesi` | Κατάθεση | Filing date (echoed from input) |
| `epidosi` | Επίδοση | Service of process on the defendant |
| `paremvasi` | Παρέμβαση | Third-party intervention |
| `paremvasiProsek` | Παρέμβαση μετά Προσεπίκληση | Intervention after joinder of third party |
| `protaseis` | Προτάσεις | Written submissions / briefs |
| `prosthiki` | Προσθήκη | Addendum / rebuttal to briefs |
| `dikasimos` | Δικάσιμος | Hearing date |
| `dikasimosCalculated` | Υπολογισμένος Δικάσιμος | Calculated hearing date |
| `dikasimosEarliest` | Νωρίτερος Δικάσιμος | Earliest permissible hearing date |
| `dikasimosLatest` | Αργότερος Δικάσιμος | Latest permissible hearing date |
| `opsigeneis` | Οψιγενείς | Late-filed claims (before hearing) |
| `opsigeneisAntikrousi` | Αντίκρουση Οψιγενών | Rebuttal to late-filed claims |
| `antikrousiArt269` | Αντίκρουση Αρθ. 269 | Post-hearing rebuttal memo (Art. 269 sec 3 CPC) |

### Day Counts

| Deadline | Pre-2026 | Post-2026 (N. 5221/2025) |
|----------|----------|--------------------------|
| **epidosi** | 30 days domestic / 60 days abroad, from katathesi | Always 30 days from katathesi |
| **paremvasi** | 60 days domestic / 90 days abroad, from katathesi | 40 days domestic / 70 days abroad, from epidosi date |
| **paremvasiProsek** | 90 days domestic / 120 days abroad, from katathesi | 70 days domestic / 100 days abroad, from epidosi date |
| **protaseis** | 90 days domestic / 120 days abroad, from epidosi date (or katathesi if klisi) | Same |
| **prosthiki** | 15 days from protaseis date | Same |
| **opsigeneis** | 20 days **before** hearing (requires dikasimos) | **Abolished** |
| **opsigeneisAntikrousi** | 10 days **before** hearing (requires dikasimos) | **Abolished** |
| **antikrousiArt269** | N/A | 5 **business days after** hearing (requires dikasimos) |
| **dikasimos window** | N/A | Computed: ~210 days domestic / 9-10 months abroad |

### Validation / Errors

- No minimum date restriction for `mode: 'neataktiki'`.
- `mode: 'eidikes'` **throws** if `katathesi < '2026-01-01'`:
  ```
  Το mode "eidikes" υποστηρίζεται μόνο για αγωγές που κατατίθενται από 2026-01-01.
  ```

### Eidikes Mode Behavior

When `mode === 'eidikes'` (only for katathesi >= `'2026-01-01'`):

- `paremvasi` and `paremvasiProsek` are returned as **empty strings** (`''`).
- `protaseis` = the `dikasimos` date itself (briefs are submitted at the hearing).
- `prosthiki` = 5 business days after the hearing date.
- If `dikasimos` is **not** provided: `protaseis` and `prosthiki` are empty strings, and their details explain why.

### Conditional Fields

| Field | Present when |
|-------|-------------|
| `opsigeneis`, `opsigeneisAntikrousi` | `dikasimos` is provided AND katathesi >= `'2022-01-01'` AND katathesi < `'2026-01-01'` |
| `antikrousiArt269` | `dikasimos` is provided AND katathesi >= `'2026-01-01'` |
| `dikasimosCalculated`, `dikasimosLatest` | katathesi >= `'2026-01-01'` |
| `dikasimosEarliest` | katathesi >= `'2026-01-01'` AND `exoterikou === true` |

### Usage Example

```ts
// Post-2026 regular procedure
const result = prothesmiesNeasTaktikis('2026-03-15', {
  topiki: 'Αθηνών',
});

// result:
// {
//   katathesi: '2026-03-15',
//   mode: 'neataktiki',
//   epidosi: '2026-04-14',
//   paremvasi: '2026-05-25',
//   paremvasiProsek: '2026-06-23',
//   protaseis: '2026-07-13',
//   prosthiki: '2026-07-28',
//   dikasimosCalculated: ...,
//   dikasimosLatest: ...,
//   epidosiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
//   ...
// }
```

```ts
// Post-2026 special procedures (eidikes) with hearing date
const result = prothesmiesNeasTaktikis('2026-03-15', {
  mode: 'eidikes',
  dikasimos: '2026-10-15',
});

// result:
// {
//   katathesi: '2026-03-15',
//   mode: 'eidikes',
//   epidosi: '2026-04-14',
//   paremvasi: '',
//   paremvasiProsek: '',
//   protaseis: '2026-10-15',      // = dikasimos
//   prosthiki: '2026-10-22',      // 5 business days after hearing
//   ...
// }
```

```ts
// Pre-2026 with hearing date (opsigeneis enabled)
const result = prothesmiesNeasTaktikis('2025-03-15', {
  dikasimos: '2025-11-15',
});

// result:
// {
//   katathesi: '2025-03-15',
//   mode: 'neataktiki',
//   epidosi: '2025-04-14',
//   paremvasi: '2025-05-14',
//   paremvasiProsek: '2025-06-13',
//   protaseis: '2025-07-14',
//   prosthiki: '2025-07-29',
//   opsigeneis: '2025-10-24',
//   opsigeneisAntikrousi: '2025-11-05',
//   ...
// }
```

---

## 2. `prothesmiesMikrodiaforon`

Small claims / small disputes procedure (Diadikasia Mikrodiaforon, Art. 466-472 CPC).

### Signature

```ts
function prothesmiesMikrodiaforon(
  katathesi: string,
  options?: Options
): ProthesmiesMikrodiaforon;
```

### Parameters

**`katathesi`** (`string`, required) -- Filing date of the lawsuit. Format: `'YYYY-MM-DD'`.

**`options`** (optional):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimosio` | `boolean` | `false` | State entity is a party. Affects proskomidiParemv calculation. |
| `exoterikou` | `boolean` | `false` | Service abroad. Extends epidosi and paremvasi deadlines. |
| `topiki` | `Topiki` | `'Αθηνών'` | Territorial jurisdiction. |
| `yliki` | `string` | (unused) | Present in the type but internally hardcoded to `'Ειρ'` (Magistrate's Court). |

### Return Type

```ts
interface ProthesmiesMikrodiaforon {
  katathesi: string;                    // Filing date (echoed)
  epidosi: string;                      // Service deadline
  proskomidi: string;                   // Document production deadline
  prosthiki: string;                    // Addendum deadline
  paremvasi: string;                    // Intervention deadline
  proskomidiParemv: string;             // Document production for intervenor
  prosthikiParemv: string;              // Addendum for intervenor
  katathesiDetails?: DeadlineDetails;
  epidosiDetails?: DeadlineDetails;
  proskomidiDetails?: DeadlineDetails;
  prosthikiDetails?: DeadlineDetails;
  paremvasiDetails?: DeadlineDetails;
  proskomidiParemvDetails?: DeadlineDetails;
  prosthikiParemvDetails?: DeadlineDetails;
}
```

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `katathesi` | Κατάθεση | Filing date |
| `epidosi` | Επίδοση | Service of process |
| `proskomidi` | Προσκομιδή | Document production / submission of evidence |
| `prosthiki` | Προσθήκη | Addendum (rebuttal to documents) |
| `paremvasi` | Παρέμβαση | Third-party intervention |
| `proskomidiParemv` | Προσκομιδή Παρεμβαίνοντος | Document production for the intervenor |
| `prosthikiParemv` | Προσθήκη Παρεμβαίνοντος | Addendum for intervenor |

### Day Counts

| Deadline | Days | Counted from |
|----------|------|--------------|
| `epidosi` | 10 domestic / 30 abroad (pre-2026); **always 10** post-2026 | `katathesi` |
| `proskomidi` | 20 | `epidosi` date |
| `prosthiki` | 5 | `proskomidi` date |
| `paremvasi` | 20 domestic / 40 abroad | `katathesi` |
| `proskomidiParemv` | 30 (or 50 if `dimosio`) | `katathesi` |
| `prosthikiParemv` | 5 | `proskomidiParemv` date |

### Validation / Errors

No explicit date validation or minimum date check.

### Usage Example

```ts
const result = prothesmiesMikrodiaforon('2026-03-15');

// result:
// {
//   katathesi: '2026-03-15',
//   epidosi: '2026-03-26',
//   proskomidi: '2026-04-15',
//   prosthiki: '2026-04-20',
//   paremvasi: '2026-04-06',
//   proskomidiParemv: '2026-04-14',
//   prosthikiParemv: '2026-04-20',
//   epidosiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
//   ...
// }
```

---

## 3. `prothesmiesDiatPliromis`

Payment orders procedure (Diatages Pliromis, Art. 625-636 CPC).

### Signature

```ts
function prothesmiesDiatPliromis(
  katathesi: string,
  options?: Options
): ProthesmiesDiatPliromis;
```

### Parameters

**`katathesi`** (`string`, required) -- Date of **issuance** of the payment order. Format: `'YYYY-MM-DD'`.

**`options`** (optional):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimosio` | `boolean` | `false` | Debtor is a state entity. Changes anakopi deadline to 30 working days. |
| `exoterikou` | `boolean` | `false` | Debtor resides abroad. Changes anakopi deadline to 30 working days. |
| `topiki` | `Topiki` | `'Αθηνών'` | Territorial jurisdiction. |
| `epidosiDone` | `string` | `undefined` | **Actual date when the payment order was served** (`'YYYY-MM-DD'`). When provided, enables `anakopi` calculation. |

### Return Type

```ts
interface ProthesmiesDiatPliromis {
  katathesi: string;                    // Issuance date (echoed)
  epidosi: string;                      // Service deadline (2 months from issuance)
  anakopi?: string;                     // Opposition deadline (conditional)
  epidosiDetails?: DeadlineDetails;
  anakopiDetails?: DeadlineDetails;
}
```

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `katathesi` | Κατάθεση | Issuance date of the payment order |
| `epidosi` | Επίδοση | Service deadline (must serve within 2 months or order lapses) |
| `anakopi` | Ανακοπή | Opposition / appeal deadline |

### Day Counts

| Deadline | Period | Counted from | Type |
|----------|--------|--------------|------|
| `epidosi` | 2 months | `katathesi` | Calendar months |
| `anakopi` | 15 working days (domestic) / 30 working days (abroad or dimosio) | `epidosiDone` | **Working days only** |

### Conditional Fields

| Field | Present when |
|-------|-------------|
| `anakopi`, `anakopiDetails` | `options.epidosiDone` is provided |

### Validation / Errors

- **Format**: Must be `'YYYY-MM-DD'` with valid month (<=12) and day (<=31).
- **Minimum date**: `katathesi >= '2022-02-01'`. Throws if earlier:
  ```
  Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα.
  ```

### Pre-2026 vs Post-2026

- **Post-2026 (N. 5221/2025)**: Payment order is now issued by a lawyer (not a judge). Legal references change to Art. 630A, 625-626 CPC (new). The 2-month service and 15/30 working day opposition periods remain the same.

### Usage Example

```ts
const result = prothesmiesDiatPliromis('2026-03-15', {
  epidosiDone: '2026-04-10',
});

// result:
// {
//   katathesi: '2026-03-15',
//   epidosi: '2026-05-15',
//   anakopi: '2026-05-05',
//   epidosiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
//   anakopiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
// }
```

```ts
// Without epidosiDone -- no anakopi in result
const result = prothesmiesDiatPliromis('2026-03-15');

// result:
// {
//   katathesi: '2026-03-15',
//   epidosi: '2026-05-15',
//   epidosiDetails: { ... },
// }
```

---

## 4. `prothesmiesApopoiisis`

Renunciation of inheritance (Apopoiisi Klironomias).

### Signature

```ts
function prothesmiesApopoiisis(
  apoviosi: string,
  options?: Options
): ProthesmiesApopoiisis;
```

### Parameters

**`apoviosi`** (`string`, required) -- Date of death of the decedent. Format: `'YYYY-MM-DD'`.

**`options`** (optional):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `exoterikou` | `boolean` | `false` | Heir or decedent resides abroad. Extends renunciation period. |
| `topiki` | `Topiki` | `'Αθηνών'` | Territorial jurisdiction. |

### Return Type

```ts
interface ProthesmiesApopoiisis {
  apoviosi: string;                     // Date of death (echoed)
  lixi: string;                         // Expiry of renunciation period
  lixiDetails?: DeadlineDetails;
}
```

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `apoviosi` | Αποβίωση | Date of death of the decedent |
| `lixi` | Λήξη | Expiry date of the renunciation period |

### Day Counts

| Deadline | Period | Counted from | Type |
|----------|--------|--------------|------|
| `lixi` | 4 months (domestic) / 12 months (abroad) | `apoviosi` | Calendar months |

No judicial suspension (anastoli) is applied. Holidays still apply for final-day adjustment.

### Validation / Errors

- **Format**: Must be `'YYYY-MM-DD'`.
- **Minimum date**: `apoviosi >= '2022-02-01'`. Throws if earlier.

### Usage Example

```ts
const result = prothesmiesApopoiisis('2026-03-15');

// result:
// {
//   apoviosi: '2026-03-15',
//   lixi: '2026-07-15',
//   lixiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
// }
```

```ts
// Abroad
const result = prothesmiesApopoiisis('2026-03-15', { exoterikou: true });
// lixi will be 12 months from apoviosi instead of 4
```

---

## 5. `prothesmiesNDSte`

Administrative court procedure before the Council of State (Nea Dikonimia sto Symvoulio tis Epikrateias / ΣτΕ).

### Signature

```ts
function prothesmiesNDSte(
  katathesi: string,
  epidosi?: string
): ProthesmiesNDSte;
```

> **Note**: This function does NOT take an options object. The second parameter is the optional service date directly.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `katathesi` | `string` | Yes | Filing date of the administrative action. `'YYYY-MM-DD'` |
| `epidosi` | `string` | No | Actual date of service on the administration. When provided, enables `apopseis` and `prosthetoiLogoi`. `'YYYY-MM-DD'` |

### Return Type

```ts
interface ProthesmiesNDSte {
  katathesi: string;                        // Filing date (echoed)
  prothesmiaEpidosis: string;               // Service deadline
  epidosi?: string;                         // Actual service date (echoed, or undefined)
  dikasimos?: string;                       // Reserved (always undefined in current code)
  apopseis?: string;                        // Administration's views deadline
  prosthetoiLogoi?: string;                 // Additional grounds deadline
  prothesmiaEpidosisDetails?: DeadlineDetails;
  apopseisDetails?: DeadlineDetails;
  prosthetoiLogoiDetails?: DeadlineDetails;
}
```

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `katathesi` | Κατάθεση | Filing date |
| `prothesmiaEpidosis` | Προθεσμία Επίδοσης | Deadline to serve the action |
| `epidosi` | Επίδοση | Actual service date (input echo) |
| `apopseis` | Απόψεις Διοίκησης | Administration's views / written response deadline |
| `prosthetoiLogoi` | Πρόσθετοι Λόγοι | Additional grounds / supplementary arguments deadline |

### Day Counts

| Deadline | Period | Counted from | Type |
|----------|--------|--------------|------|
| `prothesmiaEpidosis` | 2 months | `katathesi` | Calendar months |
| `apopseis` | 3 months | `epidosi` (actual service) | Calendar months |
| `prosthetoiLogoi` | 3 months + 20 days | `epidosi` (actual service) | 3 calendar months then 20 calendar days |

State suspension (Jul 1 - Sep 15) is **always applied** internally for all calculations.

### Conditional Fields

| Field | Present when |
|-------|-------------|
| `apopseis`, `apopseisDetails` | `epidosi` parameter is provided |
| `prosthetoiLogoi`, `prosthetoiLogoiDetails` | `epidosi` parameter is provided |

### Validation / Errors

- **Format**: Must be `'YYYY-MM-DD'`.
- **Minimum date**: `katathesi >= '2024-09-16'`. Throws if earlier:
  ```
  Επιτρέπονται οι ημερομηνίες από 06.09.2024 και έπειτα.
  ```

### Usage Example

```ts
const result = prothesmiesNDSte('2026-03-15', '2026-05-10');

// result:
// {
//   katathesi: '2026-03-15',
//   prothesmiaEpidosis: '2026-05-15',
//   epidosi: '2026-05-10',
//   apopseis: '2026-10-26',
//   prosthetoiLogoi: '2026-11-16',
//   prothesmiaEpidosisDetails: { ... },
//   apopseisDetails: { ... },
//   prosthetoiLogoiDetails: { ... },
// }
```

```ts
// Without epidosi -- only prothesmiaEpidosis is calculated
const result = prothesmiesNDSte('2026-03-15');

// result:
// {
//   katathesi: '2026-03-15',
//   prothesmiaEpidosis: '2026-05-15',
//   prothesmiaEpidosisDetails: { ... },
// }
```

---

## 6. `prothesmiesYas`

Mandatory initial mediation session (Ypochreotiki Archiki Synedria Diamesolavisis / Y.A.S.).

### Signature

```ts
function prothesmiesYas(
  gnostopoiisi: string,
  options?: Options
): ProthesmiesYas;
```

### Parameters

**`gnostopoiisi`** (`string`, required) -- Date of notification / initiation of the mandatory mediation process. Format: `'YYYY-MM-DD'`.

**`options`** (optional):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `exoterikou` | `boolean` | `false` | Party resides abroad. Extends synedria deadline. |

### Return Type

```ts
interface ProthesmiesYas {
  synedria: string;                     // Initial session deadline
  oloklirosi: string;                   // Completion deadline
  synedriaDetails: DeadlineDetails;     // Always present (not optional)
  oloklirosiDetails: DeadlineDetails;   // Always present (not optional)
}
```

> **Note**: Unlike all other functions, the `*Details` fields are **required** (always present).

### Return Fields Glossary

| Field | Greek | English |
|-------|-------|---------|
| `synedria` | Συνεδρία | Initial mediation session deadline |
| `oloklirosi` | Ολοκλήρωση | Completion of mediation process deadline |

### Day Counts

| Deadline | Days | Counted from |
|----------|------|--------------|
| `synedria` | 20 domestic / 30 abroad | `gnostopoiisi` |
| `oloklirosi` | 40 (always) | `synedria` date |

### Validation / Errors

- **Format**: Must be `'YYYY-MM-DD'`.
- **Minimum date**: `gnostopoiisi >= '2015-01-01'`. Throws if earlier.

### Usage Example

```ts
const result = prothesmiesYas('2026-03-15');

// result:
// {
//   synedria: '2026-04-06',
//   oloklirosi: '2026-05-18',
//   synedriaDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
//   oloklirosiDetails: { nomothesia: [...], ypologismos: [...], imeres: [...] },
// }
```

---

## Validation Summary

| Function | Validates format | Minimum date |
|----------|-----------------|--------------|
| `prothesmiesNeasTaktikis` | No | None (but eidikes mode requires >= `2026-01-01`) |
| `prothesmiesMikrodiaforon` | No | None |
| `prothesmiesDiatPliromis` | Yes | `>= 2022-02-01` |
| `prothesmiesApopoiisis` | Yes | `>= 2022-02-01` |
| `prothesmiesNDSte` | Yes | `>= 2024-09-16` |
| `prothesmiesYas` | Yes | `>= 2015-01-01` |

Format validation checks: 4-digit year, 2-digit month (<=12), 2-digit day (<=31), `YYYY-MM-DD` pattern.

---

## Pre-2026 vs Post-2026 Summary (N. 5221/2025)

The cutoff date is `2026-01-01`. Filings on or after this date trigger the new law:

| Change | Pre-2026 | Post-2026 |
|--------|----------|-----------|
| **NeasTaktikis: epidosi** | 30d domestic / 60d abroad | Always 30d |
| **NeasTaktikis: paremvasi base** | From katathesi | From epidosi date |
| **NeasTaktikis: paremvasi days** | 60d / 90d | 40d / 70d |
| **NeasTaktikis: paremvasiProsek base** | From katathesi | From epidosi date |
| **NeasTaktikis: paremvasiProsek days** | 90d / 120d | 70d / 100d |
| **NeasTaktikis: opsigeneis** | 20d before hearing | **Abolished** |
| **NeasTaktikis: antikrousiArt269** | N/A | 5 business days after hearing |
| **NeasTaktikis: dikasimos window** | N/A | Computed (210d domestic / 9-10 months abroad) |
| **NeasTaktikis: eidikes mode** | Not available (throws) | Available |
| **Mikrodiaforon: epidosi abroad** | 30d | **Always 10d** |
| **DiatPliromis: nomothesia** | Art. 630A CPC (old), judge-issued | Art. 630A CPC (new), lawyer-issued |

---

## Frontend Integration Notes

### Form Inputs vs Display Outputs

**Form inputs** (what the user provides):

| Function | Input field(s) | Options to expose as form controls |
|----------|---------------|-----------------------------------|
| `prothesmiesNeasTaktikis` | `katathesi` | `dimosio`, `exoterikou`, `yliki`, `topiki`, `klisi`, `mode`, `dikasimos` |
| `prothesmiesMikrodiaforon` | `katathesi` | `dimosio`, `exoterikou`, `topiki` |
| `prothesmiesDiatPliromis` | `katathesi` | `dimosio`, `exoterikou`, `topiki`, `epidosiDone` |
| `prothesmiesApopoiisis` | `apoviosi` | `exoterikou`, `topiki` |
| `prothesmiesNDSte` | `katathesi`, `epidosi` | (none -- no options object) |
| `prothesmiesYas` | `gnostopoiisi` | `exoterikou` |

**Display outputs**: All returned date fields and their corresponding `*Details` objects.

### Handling DeadlineDetails

Each `*Details` object contains arrays of strings. Display them as:

```tsx
// Example React rendering
{details.nomothesia.map((text, i) => <p key={i}>{text}</p>)}
{details.ypologismos.map((text, i) => <p key={i}>{text}</p>)}
{details.imeres.map((text, i) => <p key={i}>{text}</p>)}
```

- `nomothesia` -- Legal citations (show in a "Legal basis" section)
- `ypologismos` -- Calculation notes (show in a "Calculation notes" section, may be empty)
- `imeres` -- Day count summary (show as a concise subtitle)

### Conditional UI Logic

1. **`prothesmiesDiatPliromis`**: Only show `anakopi` fields when the user has provided `epidosiDone`.

2. **`prothesmiesNDSte`**: Only show `apopseis` and `prosthetoiLogoi` fields when the user has provided `epidosi`.

3. **`prothesmiesNeasTaktikis`**:
   - Show `mode` selector (neataktiki / eidikes). Disable eidikes if katathesi < `2026-01-01`.
   - When `mode === 'eidikes'`: hide paremvasi/paremvasiProsek (they are empty strings). Show protaseis/prosthiki only if `dikasimos` is provided.
   - When `mode === 'neataktiki'` and katathesi < `2026-01-01`: show `opsigeneis`/`opsigeneisAntikrousi` if `dikasimos` is provided.
   - When `mode === 'neataktiki'` and katathesi >= `2026-01-01`: show `antikrousiArt269` if `dikasimos` is provided. Show `dikasimosCalculated`/`dikasimosLatest`/`dikasimosEarliest`.

### Error Handling

All functions throw standard `Error` objects with Greek-language messages. Wrap calls in try/catch:

```ts
try {
  const result = prothesmiesDiatPliromis(dateString, options);
  // display result
} catch (e) {
  // e.message will be in Greek, e.g.:
  // "Πρέπει να εισάγετε έγκυρη ημερομηνία της μορφής 'ΕΕΕΕ-ΜΜ-ΗΗ' (πχ. '2022-04-28')"
  // "Επιτρέπονται οι ημερομηνίες από 01.02.2022 και έπειτα."
  showError(e.message);
}
```
