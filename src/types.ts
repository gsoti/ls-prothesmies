export enum DeadlineType {
    KATATHESI = "katathesi",
    EPIDOSI = "epidosi",
    PAREMVASI = "paremvasi",
    PAREMVASI_PROSEK = "paremvasiProsek",
    PROTASEIS = "protaseis",
    PROSTHIKI = "prosthiki",
    OPSIGENEIS = "opsigeneis",
    OPSIGENEIS_ANTIKROUSI = "opsigeneisAntikrousi",
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

