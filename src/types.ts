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

export interface DateCalculation {
    date: string;
    paused: string[];
    skipped: string[];
    logic: {
        days: number;
        when: 'before' | 'after';
        reference: string;
    }
}

export interface Deadline {
    name: string;
    type: DeadlineType;
    date: string;
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
    calculation: DateCalculation | null;
}

