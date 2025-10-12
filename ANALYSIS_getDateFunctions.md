# Deep Analysis: getDateInfo vs getDateErgasimesOnly

## Overview
Both functions calculate future dates based on a starting date and number of days, but they handle holidays (argies) and court suspensions (anastoli) differently.

## Function 1: getDateInfo

### Purpose
Calculates dates by counting **calendar days** while excluding only **anastoli (court suspensions)** from the count, but **includes argies (holidays)** in the count.

### Step-by-Step Logic

#### Phase 1: Main Counting Loop (lines 139-148)
```typescript
for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() + 24 * 3600 * 1000);  // Add 1 day

    if (!argiesAndAnastoli.anastoli.includes(dt.toISOString().split('T')[0])) {
        arr.push(new Date(dt));
        i++;  // Count this day
    } else {
        paused.push(new Date(dt).toISOString().split('T')[0]);  // Track paused day
        // Don't increment i - this day doesn't count
    }
}
```

**Key behavior:**
- ✅ Counts regular days (including holidays/argies)
- ⏸️ Skips anastoli days (court suspensions) - adds to `paused` array
- 📊 Tracks which days were paused

#### Phase 2: Holiday Adjustment (lines 153-161)
```typescript
while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
        r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
) {
    skipped.push(new Date(lastDay).toISOString().split('T')[0]);
    lastDay.setTime(lastDay.getTime() + 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
}
```

**Key behavior:**
- If the final calculated day lands on a holiday OR court suspension, move forward
- Keep moving until finding a day that is neither a holiday nor a suspension
- Track all skipped days in the `skipped` array

### Return Value
```typescript
{
    date: Date,           // Final calculated date
    paused: string[],     // Days skipped during counting (anastoli)
    skipped: string[]     // Days skipped at the end (argies + anastoli)
}
```

---

## Function 2: getDateErgasimesOnly

### Purpose
Calculates dates by counting **only working days** (εργάσιμες ημέρες), excluding **both argies (holidays) AND anastoli (court suspensions)** from the count.

### Step-by-Step Logic

#### Phase 1: Main Counting Loop (lines 176-187)
```typescript
for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() + 24 * 3600 * 1000);  // Add 1 day

    if (
        [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
            r => r === dt.toISOString().split('T')[0]
        ) === -1
    ) {
        arr.push(new Date(dt));
        i++;  // Count this day
    }
    // If day is holiday or suspension, don't increment i - doesn't count
}
```

**Key behavior:**
- ✅ Only counts actual working days
- ⏸️ Skips BOTH argies (holidays) AND anastoli (court suspensions)
- ❌ Does NOT track which days were skipped

#### Phase 2: Holiday Adjustment (lines 192-199)
```typescript
while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
        r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
) {
    lastDay.setTime(lastDay.getTime() + 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
}
```

**Key behavior:**
- Same as getDateInfo - ensures final day is not a holiday or suspension
- Does NOT track skipped days

### Return Value
```typescript
Date  // Just the final calculated date
```

---

## Key Differences Summary

| Aspect | getDateInfo | getDateErgasimesOnly |
|--------|-------------|---------------------|
| **Counting Method** | Calendar days (excluding anastoli only) | Working days only |
| **Holidays (argies)** | ✅ Included in count | ❌ Excluded from count |
| **Suspensions (anastoli)** | ❌ Excluded from count | ❌ Excluded from count |
| **Tracking** | Tracks paused & skipped days | No tracking |
| **Return Type** | Object with date, paused, skipped | Just Date object |
| **Use Case** | "30 days from date X" (calendar days) | "5 working days from date X" |

---

## Practical Example

**Scenario:**
- Start: Monday, January 1, 2024
- Count: 5 days
- Argies (holidays): January 3 (Wed), January 6 (Sat), January 7 (Sun)
- Anastoli (suspensions): None

### getDateInfo Result:
```
Day 1: Jan 2 (Tue)    ✅ Count
Day 2: Jan 3 (Wed)    ✅ Count (holiday, but still counted!)
Day 3: Jan 4 (Thu)    ✅ Count
Day 4: Jan 5 (Fri)    ✅ Count
Day 5: Jan 6 (Sat)    ✅ Count (holiday, but still counted!)

Result before adjustment: Jan 6
Jan 6 is a holiday → move to Jan 7
Jan 7 is a holiday → move to Jan 8
Final Result: January 8, 2024

Paused: []
Skipped: ['2024-01-06', '2024-01-07']
```

### getDateErgasimesOnly Result:
```
Day 1: Jan 2 (Tue)    ✅ Count (working day 1)
Skip:  Jan 3 (Wed)    ⏭️ Holiday - don't count
Day 2: Jan 4 (Thu)    ✅ Count (working day 2)
Day 3: Jan 5 (Fri)    ✅ Count (working day 3)
Skip:  Jan 6 (Sat)    ⏭️ Holiday - don't count
Skip:  Jan 7 (Sun)    ⏭️ Holiday - don't count
Day 4: Jan 8 (Mon)    ✅ Count (working day 4)
Day 5: Jan 9 (Tue)    ✅ Count (working day 5)

Final Result: January 9, 2024

No tracking data returned
```

---

## Greek Legal Context

### When to use getDateInfo:
- Deadlines specified as "X days" (ημέρες) - e.g., "30 days from filing" (Art. 215 § 2 ΚΠολΔ)
- Court suspension periods (anastoli) don't count
- Holidays count, but if the deadline falls on a holiday, it moves to the next working day

### When to use getDateErgasimesOnly:
- Deadlines specified as "X working days" (εργάσιμες ημέρες) - e.g., "5 working days from hearing" (Art. 591)
- Only actual working days count
- Both holidays and court suspensions are excluded

---

## Code Quality Notes

### Issues in both functions:
1. **Mutation of Date objects**: Both functions mutate `dt` in the loop, which could lead to unexpected behavior
2. **No validation**: No checks for invalid inputs
3. **Magic numbers**: `24 * 3600 * 1000` appears multiple times (should be a constant)
4. **Array concatenation in loops**: `[...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli]` is recreated on every iteration

### Recommendations:
1. Create a combined holidays array once at the start
2. Use constants for time calculations
3. Add input validation
4. Consider immutable date operations

---

# Deep Analysis: argiesFunc and anastoliFunc

## Overview
These two functions are the foundation for date calculations in the Greek legal system. They provide arrays of dates that represent non-working days.

---

## Function 1: argiesFunc (Holidays)

### Purpose
Returns an array of **all holidays** (αργίες) for a given year range, including both fixed and movable (Orthodox) holidays, plus all weekends.

### Signature
```typescript
argiesFunc(year?: number): string[]
```

### Logic Breakdown

#### With year parameter (typical usage):
```typescript
for (let i = year - 1; i <= year + 1; i++) {
    arr.push(kinitesArgiesFunc(i));      // Movable holidays
    arr.push(statheresArgiesFunc(i));    // Fixed holidays + weekends
}
return arr.flat().sort();
```

**Behavior:**
- Returns holidays for **3 years**: previous year, current year, next year
- Combines movable (Orthodox) and fixed holidays
- Example: `argiesFunc(2024)` returns holidays for 2023, 2024, 2025

#### Without year parameter (fallback):
```typescript
for (let i = 0; i < 20; i++) {
    arr.push(kinitesArgiesFunc(2015 + i));
    arr.push(statheresArgiesFunc(2015 + i));
}
```

**Behavior:**
- Returns holidays for **20 years**: 2015-2034
- Useful when year is unknown or for long-term calculations

---

### Sub-function: kinitesArgiesFunc (Movable Holidays)

**Purpose:** Calculates Orthodox Easter (Πάσχα) and related movable holidays.

**Algorithm:** Uses the Computus algorithm (Gregorian calendar variant) to calculate Easter.

**Returns 4 movable holidays:**
1. **Καθαρά Δευτέρα** (Clean Monday) = Easter - 48 days
2. **Μεγάλη Παρασκευή** (Good Friday) = Easter - 2 days
3. **Δευτέρα του Πάσχα** (Easter Monday) = Easter + 1 day
4. **Αγίου Πνεύματος** (Holy Spirit Monday) = Easter + 50 days

**Example for 2024:**
```typescript
kinitesArgiesFunc(2024) // Returns:
[
  '2024-03-18',  // Καθαρά Δευτέρα
  '2024-05-03',  // Μεγάλη Παρασκευή
  '2024-05-06',  // Δευτέρα του Πάσχα
  '2024-06-24'   // Αγίου Πνεύματος
]
```

---

### Sub-function: statheresArgiesFunc (Fixed Holidays)

**Purpose:** Returns all fixed Greek public holidays and weekends.

**Fixed holidays (9 total):**
```typescript
'01-01'  // Πρωτοχρονιά (New Year)
'01-06'  // Θεοφάνεια (Epiphany)
'03-25'  // 25η Μαρτίου (Independence Day)
'05-01'  // 1η Μαΐου (Labor Day)
'08-15'  // Κοίμηση της Θεοτόκου (Assumption of Mary)
'10-03'  // Αγίου Διονυσίου (St. Dionysius - Athens specific?)
'10-28'  // 28η Οκτωβρίου (Ohi Day)
'12-25'  // Χριστούγεννα (Christmas)
'12-26'  // 2η μέρα Χριστουγέννων (Boxing Day)
```

**Plus ALL weekends:**
- Iterates through every day of the year
- Adds Saturday (day=6) and Sunday (day=0) to the array

**Example for 2024:**
```typescript
statheresArgiesFunc(2024) // Returns:
[
  '2024-01-01',  // New Year
  '2024-01-06',  // Epiphany
  '2024-01-06',  // Saturday
  '2024-01-07',  // Sunday
  '2024-01-13',  // Saturday
  '2024-01-14',  // Sunday
  // ... all weekends
  '2024-03-25',  // Independence Day
  // ... continues with all holidays + weekends
]
```

---

## Function 2: anastoliFunc (Court Suspensions)

### Purpose
Returns an array of dates when **court operations are suspended** (αναστολή) - specifically the entire month of **August** (summer vacation).

### Signature
```typescript
anastoliFunc(year?: number): string[]
```

### Logic Breakdown

#### With year parameter (typical usage):
```typescript
for (let i = year - 1; i <= year + 1; i++) {
    for (let k = 1; k <= 31; k++) {
        arr.push(`${i}-08-${addZero(k)}`);  // All of August
    }
}
```

**Behavior:**
- Returns **all days of August** for 3 years (previous, current, next)
- 31 days × 3 years = 93 dates
- Example: `anastoliFunc(2024)` returns Aug 2023, Aug 2024, Aug 2025

#### Without year parameter (fallback):
```typescript
for (let i = 0; i < 20; i++) {
    for (let k = 1; k <= 31; k++) {
        arr.push(`20${addZero(i + 15)}-08-${addZero(k)}`);
    }
}
```

**Behavior:**
- Returns August for 20 years: 2015-2034
- 31 days × 20 years = 620 dates

**Example output:**
```typescript
anastoliFunc(2024) // Returns:
[
  '2023-08-01', '2023-08-02', ..., '2023-08-31',  // 31 dates
  '2024-08-01', '2024-08-02', ..., '2024-08-31',  // 31 dates
  '2025-08-01', '2025-08-02', ..., '2025-08-31',  // 31 dates
]
```

---

## Legal Context

### argiesFunc (Holidays):
Greek law (Article 147 ΚΠολΔ) states that deadlines **don't expire on holidays**. If a deadline falls on:
- A public holiday
- A Saturday or Sunday
- A movable Orthodox holiday

The deadline automatically **moves to the next working day**.

### anastoliFunc (Court Suspensions):
Greek law mandates court vacation periods (Article 146 ΚΠολΔ):
- **Entire month of August** - courts are closed
- During this period, deadlines are **paused** (not counted)
- Deadlines resume counting after August 31

---

## Comparison Table

| Aspect | argiesFunc | anastoliFunc |
|--------|-----------|--------------|
| **Purpose** | Public holidays + weekends | Court vacation periods |
| **Month** | All year | August only |
| **Count** | ~120-130 days/year | 31 days/year |
| **Includes** | Fixed holidays, Easter-related, weekends | Just August 1-31 |
| **Legal Effect** | Deadline moves if lands on holiday | Deadline pauses during period |
| **Years Covered** | year-1, year, year+1 (3 years) | year-1, year, year+1 (3 years) |

---

## How They Work Together

In date calculation functions like `getDateInfo` and `getDateErgasimesOnly`:

```typescript
{
    argies: argiesFunc(year),      // When deadline lands here → move forward
    anastoli: anastoliFunc(year)   // Days here → don't count at all
}
```

**Example scenario:**
- Deadline: 30 days from June 15, 2024
- June 15 + 30 days = July 15
- **But**: July contains weekends (argies) and no anastoli
- **Then**: August 1-31 are anastoli (suspended) - days don't count
- **Result**: Deadline extends into September

---

## Code Quality Notes

### argiesFunc Issues:
1. **Redundant array spreading**: `arr.push()` then `flat()` - could be done more efficiently
2. **No caching**: Recalculates holidays every time, even for same year
3. **Magic year range**: Hard-coded 2015-2034 range in fallback

### anastoliFunc Issues:
1. **Hard-coded August**: Should reference legal code or config
2. **31 days always**: Assumes August has 31 days (it does, but still hard-coded)
3. **No flexibility**: Can't add other suspension periods (e.g., December holidays)

### Recommendations:
1. **Cache results**: Store calculated holidays for each year
2. **Configurable suspension periods**: Allow other months/periods beyond August
3. **Legal reference comments**: Add article references (e.g., "Article 146 ΚΠολΔ")
4. **Single source of truth**: Consider loading holidays from a config file or database
