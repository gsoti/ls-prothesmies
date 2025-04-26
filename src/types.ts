export enum DeadlineType {
    KATATHESI = "katathesi",                    
    EPIDOSI = "epidosi",                        // NEA TAKTIKH, ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    PAREMVASI = "paremvasi",                    // NEA TAKTIKH, ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    PAREMVASI_PROSEK = "paremvasiProsek",       // NEA TAKTIKH
    PROTASEIS = "protaseis",                    // NEA TAKTIKH
    PROSTHIKI = "prosthiki",                    // NEA TAKTIKH, ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    OPSIGENEIS = "opsigeneis",                  // NEA TAKTIKH
    OPSIGENEIS_ANTIKROUSI = "opsigeneisAntikrousi", // NEA TAKTIKH
    PROSKOMIDI = "proskomidi",                  // ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    PROSKOMIDI_PAREMV = "proskomidiParemv",     // ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    PROSTHIKI_PAREMV = "prosthikiParemv",       // ΜΙΚΡΟΔΙΑΦΟΡΕΣ
    DIKASIMOS = "dikasimos",
}

// TODO: Add more types as needed
// Check tipoukeitos for
// 1. Προθεσμία επίδοσης για ένορκες βεβαιώσεις προτάσεων
// 2. Προθεσμία επίδοσης για ένορκες βεβαιώσεις προσθήκης - αντίκρουσης

export interface DateCalculation {
    date: string;
    paused: string[];
    skipped: string[];
    logic: {
        days: number;
        when: 'before' | 'after';
        reference: string;
        start: string;
    }
}

export interface Deadline {
    name: string;
    shortName: string;
    type: DeadlineType;
    date: string;
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
    calculation: DateCalculation | null;
}

