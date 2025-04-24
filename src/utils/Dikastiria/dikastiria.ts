import {
  barbaraLegalAnalysis,
  danielLegalAnalysis,
  legalAnalysis,
} from '../LegalAnalysis/legalAnalysis';
import { returnDatesBetween } from '../Various/returnDatesBetween';

export const dikastiria = [
  {
    efeteio: 'Αθηνών',
    protovathmia: [
      {
        protodikeio: 'Αθηνών',
        eirinodikeia: [
          'Αθηνών',
          'Αμαρoυσίoυ',
          'Αχαρνών',
          'Ελευσίνας',
          'Καλλιθέας',
          'Κρωπίας',
          'Λαυρίoυ',
          'Ν. Iωvίας',
          'Ν. Λιoσίωv',
          'Μαραθώvoς',
          'Μεγάρωv',
          'Περιστερίoυ',
          'Χαλαvδρίoυ',
        ],
      },
    ],
  },
  {
    efeteio: 'Εύβοιας (Χαλκίδα)',
    protovathmia: [
      {
        protodikeio: 'Θηβών',
        eirinodikeia: ['Θηβών', 'Ερυθρών', 'Θεσπιών', 'Θίσβης'],
      },
      {
        protodikeio: 'Χαλκίδας',
        eirinodikeia: [
          'Χαλκίδας',
          'Αγίας Άννας',
          'Αυλωναρίου',
          'Ιστιαίας',
          'Καρύστου',
          'Κύμης',
          'Λίμνης',
          'Σκύρου',
          'Ταμινέων',
        ],
      },
    ],
  },
  {
    efeteio: 'Αιγαίου (Σύρος)',
    protovathmia: [
      {
        protodikeio: 'Σύρου',
        eirinodikeia: [
          'Σύρου',
          'Άνδρου',
          'Ερμούπολης',
          'Κύθνου',
          'Μήλου',
          'Μυκόνου',
          'Πάρου',
          'Σερίφου',
          'Σίφνου',
          'Τήνου',
        ],
      },
      {
        protodikeio: 'Σάμου',
        eirinodikeia: ['Σάμου', 'Ευδήλου', 'Ικαρίας', 'Καρλοβασίου'],
      },
      {
        protodikeio: 'Νάξου',
        eirinodikeia: ['Νάξου', 'Αμοργού', 'Θήρας', 'Ίου', 'Τραγαίας'],
      },
    ],
  },
  {
    efeteio: 'Βορείου Αιγαίου (Μυτιλήνη)',
    protovathmia: [
      {
        protodikeio: 'Μυτιλήνης',
        eirinodikeia: [
          'Μυτιλήνης',
          'Ερεσσού',
          'Καλλονής',
          'Παπάδου',
          'Πλωμαρίου',
          'Πολυχνίτου',
        ],
      },
      {
        protodikeio: 'Χίου',
        eirinodikeia: ['Χίου', 'Βολισσού'],
      },
    ],
  },
  {
    efeteio: 'Δυτικής Μακεδονίας (Κοζάνη)',
    protovathmia: [
      {
        protodikeio: 'Κοζάνης',
        eirinodikeia: [
          'Κοζάνης',
          'Ανασελίτσης',
          'Εορδαίας',
          'Σερβίων',
          'Σιατίστης',
        ],
      },
      {
        protodikeio: 'Γρεβενών',
        eirinodikeia: ['Γρεβενών', 'Δεσκάτης', 'Πενταλόφου'],
      },
      {
        protodikeio: 'Καστοριάς',
        eirinodikeia: ['Καστοριάς', 'Νεστορίου', 'Κλεισούρας'],
      },
      {
        protodikeio: 'Φλώρινας',
        eirinodikeia: ['Φλώρινας', 'Αμυνταίου', 'Πρεσπών'],
      },
    ],
  },
  {
    efeteio: 'Δωδεκανήσου (Ρόδος)',
    protovathmia: [
      {
        protodikeio: 'Ρόδου',
        eirinodikeia: ['Ρόδου', 'Καρπάθου', 'Σύμης', 'Μεγίστης'],
      },
      {
        protodikeio: 'Κω',
        eirinodikeia: [
          'Κω',
          'Καλύμνου',
          'Λέρου',
          'Πάτμου',
          'Αστυπάλαιας',
          'Νισύρου',
        ],
      },
    ],
  },
  {
    efeteio: 'Θεσσαλονίκης',
    protovathmia: [
      {
        protodikeio: 'Θεσσαλονίκης',
        eirinodikeia: [
          'Θεσσαλονίκης',
          'Βασιλικών',
          'Κουφαλίων',
          'Λαγκαδά',
          'Σωχού',
        ],
      },
      {
        protodikeio: 'Βέροιας',
        eirinodikeia: ['Βέροιας', 'Αλεξάνδρειας', 'Νάουσας'],
      },
      {
        protodikeio: 'Έδεσσας',
        eirinodikeia: ['Έδεσσας', 'Αλμωπίας', 'Σκύδρας'],
      },
      {
        protodikeio: 'Κατερίνης',
        eirinodikeia: ['Πιερίας', 'Κολινδρού'],
      },
      {
        protodikeio: 'Κιλκίς',
        eirinodikeia: ['Κιλκίς', 'Γουμένισσας', 'Μουριών', 'Πολυκάστρου'],
      },
      {
        protodikeio: 'Σερρών',
        eirinodikeia: [
          'Σερρών',
          'Ηράκλειας',
          'Νιγρίτας',
          'Πορροΐων',
          'Ροδολίβους',
          'Συντίκης',
          'Φυλλίδος',
        ],
      },
      {
        protodikeio: 'Χαλκιδικής',
        eirinodikeia: [
          'Πολυγύρου',
          'Αρναίας',
          'Ιερισσού',
          'Κασσάνδρας',
          'Ν.Μουδανιών',
          'Συκιάς',
        ],
      },
      {
        protodikeio: 'Γιαννιτσών',
        eirinodikeia: ['Γιαννιτσών', 'Κρύας Βρύσης'],
      },
    ],
  },
  {
    efeteio: 'Θράκης (Κομοτηνή)',
    protovathmia: [
      { protodikeio: 'Ροδόπης', eirinodikeia: ['Κομοτηνής', 'Σαππών'] },
      {
        protodikeio: 'Δράμας',
        eirinodikeia: ['Δράμας', 'Νευροκοπίου', 'Νέστου', 'Προσωτσάνης'],
      },
      {
        protodikeio: 'Έβρου',
        eirinodikeia: ['Αλεξανδρούπολης', 'Σαμοθράκης', 'Σουφλίου'],
      },
      {
        protodikeio: 'Καβάλας',
        eirinodikeia: ['Καβάλας', 'Θάσου', 'Παγγαίου', 'Χρυσούπολη'],
      },
      {
        protodikeio: 'Ξάνθης',
        eirinodikeia: ['Ξάνθης', 'Σταυρούπολης'],
      },
      {
        protodikeio: 'Ορεστιάδας',
        eirinodikeia: ['Ορεστιάδας', 'Διδυμοτείχου', 'Δικαίων'],
      },
    ],
  },
  {
    efeteio: 'Ιωαννίνων',
    protovathmia: [
      {
        protodikeio: 'Ιωαννίνων',
        eirinodikeia: [
          'Ιωαννίνων',
          'Ζαγορίου',
          'Ζίτσης',
          'Κονίτσης',
          'Μετσόβου',
          'Πωγωνίου',
        ],
      },
      {
        protodikeio: 'Άρτας',
        eirinodikeia: [
          'Άρτας',
          'Καλεντίνης',
          'Τζουμέρκων',
          'Φιλιππιάδας',
          'Δροσοπηγής',
        ],
      },
      {
        protodikeio: 'Πρέβεζας',
        eirinodikeia: ['Πρέβεζας', 'Θεσπρωτικού', 'Πάργας'],
      },
    ],
  },
  {
    efeteio: 'Κέρκυρας',
    protovathmia: [
      {
        protodikeio: 'Κέρκυρας',
        eirinodikeia: ['Κέρκυρας', 'Λευκίμης', 'Παξών'],
      },
      {
        protodikeio: 'Θεσπρωτίας',
        eirinodikeia: ['Ηγουμενίτσας', 'Παραμυθιάς', 'Φιλιατών'],
      },
    ],
  },
  {
    efeteio: 'Κρήτης (Χανιά)',
    protovathmia: [
      {
        protodikeio: 'Χανίων',
        eirinodikeia: [
          'Χανίων',
          'Βάμου',
          'Καντάνου',
          'Καστελίου-Κισσάμου',
          'Κολυμβαρίου',
          'Χώρας Σφακίων',
        ],
      },
      {
        protodikeio: 'Ρεθύμνης',
        eirinodikeia: ['Ρεθύμνης', 'Αμαρίου', 'Μυλοποτάμου', 'Σπηλίου'],
      },
    ],
  },
  {
    efeteio: 'Ανατολικής Κρήτης (Ηράκλειο)',
    protovathmia: [
      {
        protodikeio: 'Ηρακλείου',
        eirinodikeia: [
          'Ηρακλείου',
          'Αρκαλοχωρίου',
          'Βιάννου',
          'Καστελίου-Πεδιάδος',
          'Μοιρών',
          'Πύργου Κρήτης',
          'Χερσονήσσου',
        ],
      },
      {
        protodikeio: 'Λασιθίου',
        eirinodikeia: [
          'Αγίου Νικολάου',
          'Νεαπόλεως',
          'Ιεράπετρας',
          'Σητείας',
          'Τζερμιάδων',
        ],
      },
    ],
  },
  {
    efeteio: 'Λαμίας',
    protovathmia: [
      {
        protodikeio: 'Λαμίας',
        eirinodikeia: [
          'Λαμίας',
          'Αταλάντης',
          'Αμφίκλειας',
          'Δομοκού',
          'Ελάτειας',
          'Θερμοπυλών',
          'Μακρακώμης',
          'Σπερχειάδας',
          'Υπάτης',
          'Φαλάρων',
        ],
      },
      {
        protodikeio: 'Άμφισσας',
        eirinodikeia: [
          'Άμφισσας',
          'Δελφών',
          'Δωρίδος',
          'Δωριέων',
          'Ευπαλίου',
          'Ιτέας',
          'Τολοφώνος',
        ],
      },
      {
        protodikeio: 'Ευρυτανίας',
        eirinodikeia: ['Ευρυτανίας', 'Αγραίων', 'Απεραντίων'],
      },
      {
        protodikeio: 'Λιβαδειάς',
        eirinodikeia: [
          'Λιβαδειάς',
          'Αλιάρτου',
          'Αμβρυσσού',
          'Αράχωβας',
          'Δαυλείας',
          'Ορχομενού',
        ],
      },
    ],
  },
  {
    efeteio: 'Λάρισας',
    protovathmia: [
      {
        protodikeio: 'Λάρισας',
        eirinodikeia: [
          'Λάρισας',
          'Ελασσόνας',
          'Αγυιάς',
          'Κισσάβου',
          'Ολύμπου',
          'Τυρνάβου',
          'Φαρσάλων',
        ],
      },
      {
        protodikeio: 'Βόλου',
        eirinodikeia: [
          'Βόλου',
          'Αλμυρού',
          'Αργαλαστής',
          'Ζαγοράς',
          'Μηλέων',
          'Σκιάθου',
          'Σκοπέλου',
          'Φερών',
        ],
      },
      {
        protodikeio: 'Καρδίτσας',
        eirinodikeia: ['Καρδίτσας', 'Μουζακίου', 'Παλαμά', 'Σοφάδων'],
      },
      {
        protodikeio: 'Τρικάλων',
        eirinodikeia: ['Τρικάλων', 'Καλαμπάκας', 'Πύρρας', 'Φαρκαδόνος'],
      },
    ],
  },
  {
    efeteio: 'Ναυπλίου',
    protovathmia: [
      {
        protodikeio: 'Ναυπλίου',
        eirinodikeia: [
          'Ναυπλίου',
          'Άργους',
          'Άστρους',
          'Μάσσητος',
          'Ν.Επιδαύρου',
          'Πρασσιών',
        ],
      },
      {
        protodikeio: 'Κορίνθου',
        eirinodikeia: [
          'Κορίνθου',
          'Σικυώνος',
          'Δερβενίου',
          'Νεμέας',
          'Ξυλοκάστρου',
          'Στυμφαλίας',
          'Φενεού',
        ],
      },
      {
        protodikeio: 'Σπάρτης',
        eirinodikeia: ['Σπάρτης', 'Επιδαύρου-Λιμηράς', 'Καστορίου', 'Κροκεών'],
      },
      {
        protodikeio: 'Τρίπολης',
        eirinodikeia: [
          'Τρίπολης',
          'Καρυταίνης',
          'Μεγαλόπολης',
          'Νυμφασίας',
          'Ορχομενού',
          'Τανίας Δολανών',
          'Τευθίδος',
          'Τροπαίων',
          'Ψωφίδος',
        ],
      },
    ],
  },
  {
    efeteio: 'Πατρών',
    protovathmia: [
      {
        protodikeio: 'Πατρών',
        eirinodikeia: ['Πατρών', 'Δύμης', 'Τριταίας', 'Φαρρών'],
      },
      {
        protodikeio: 'Αιγίου',
        eirinodikeia: ['Αιγιαλείας', 'Ερινεού'],
      },
      {
        protodikeio: 'Αμαλιάδας',
        eirinodikeia: [
          'Αμαλιάδας',
          'Βάρδας',
          'Βαρθολομιού',
          'Γαστούνης',
          'Μυρτουντίων',
        ],
      },
      {
        protodikeio: 'Ζακύνθου',
        eirinodikeia: ['Ζακύνθου'],
      },
      {
        protodikeio: 'Ηλείας',
        eirinodikeia: [
          'Πύργου',
          'Ελευσίνας Πελοποννήσου',
          'Κρεστένων',
          'Λαμπείας',
          'Ολυμπίων',
          'Ωλένης',
          'Ανδρίτσαινης',
          'Αρήνης',
        ],
      },
      {
        protodikeio: 'Καλαβρύτων',
        eirinodikeia: ['Καλαβρύτων', 'Ακράτας', 'Αροανίας', 'Κλειτορίας'],
      },
      {
        protodikeio: 'Κεφαλληνίας',
        eirinodikeia: ['Αργοστολίου', 'Ιθάκης', 'Ληξουρίου', 'Σαμαίων'],
      },
    ],
  },
  {
    efeteio: 'Δυτικής Στερεάς Ελλάδας (Αγρίνιο)',
    protovathmia: [
      {
        protodikeio: 'Αγρινίου',
        eirinodikeia: ['Αγρινίου', 'Βάλτου', 'Εχίνου', 'Θέρμου'],
      },
      {
        protodikeio: 'Λευκάδας',
        eirinodikeia: ['Λευκάδας', 'Απολλωνίων', 'Βονίτσας', 'Σολίου'],
      },
      {
        protodikeio: 'Μεσολογίου',
        eirinodikeia: [
          'Μεσολογίου',
          'Αιτωλικού',
          'Αποδοτίας',
          'Μακρυνείας',
          'Ναυπάκτου',
          'Ξηρομέρου',
          'Παραχελωΐτιδος',
          'Προσχίου',
        ],
      },
    ],
  },
  {
    efeteio: 'Πειραιά',
    protovathmia: [
      {
        protodikeio: 'Πειραιά',
        eirinodikeia: [
          'Πειραιά',
          'Αιγίνης',
          'Καλαυρίας',
          'Κυθήρων',
          'Νίκαιας',
          'Σαλαμίνας',
          'Σπετσών',
        ],
      },
    ],
  },
  {
    efeteio: 'Καλαμάτας',
    protovathmia: [
      {
        protodikeio: 'Καλαμάτας',
        eirinodikeia: ['Καλαμάτας', 'Οιχαλίας', 'Παμίσου', 'Πύλου'],
      },
      {
        protodikeio: 'Κυπαρισσίας',
        eirinodikeia: [
          'Κυπαρισσίας',
          'Δωρίου',
          'Εράνης',
          'Πλαταμώδους',
          'Φλεσιάδος',
          'Φυγαλείας',
        ],
      },
      {
        protodikeio: 'Γυθείου',
        eirinodikeia: ['Γυθείου', 'Νεαπόλεως Βοιών'],
      },
    ],
  },
];

export type Court = {
  court:
    | 'Αθηνών'
    | 'Θηβών'
    | 'Χαλκίδας'
    | 'Σύρου'
    | 'Σάμου'
    | 'Νάξου'
    | 'Μυτιλήνης'
    | 'Χίου'
    | 'Κοζάνης'
    | 'Γρεβενών'
    | 'Καστοριάς'
    | 'Φλώρινας'
    | 'Ρόδου'
    | 'Κω'
    | 'Θεσσαλονίκης'
    | 'Βέροιας'
    | 'Έδεσσας'
    | 'Κατερίνης'
    | 'Κιλκίς'
    | 'Σερρών'
    | 'Χαλκιδικής'
    | 'Γιαννιτσών'
    | 'Ροδόπης'
    | 'Δράμας'
    | 'Έβρου'
    | 'Καβάλας'
    | 'Ξάνθης'
    | 'Ορεστιάδας'
    | 'Ιωαννίνων'
    | 'Άρτας'
    | 'Πρέβεζας'
    | 'Κέρκυρας'
    | 'Θεσπρωτίας'
    | 'Χανίων'
    | 'Ρεθύμνης'
    | 'Ηρακλείου'
    | 'Λασιθίου'
    | 'Λαμίας'
    | 'Άμφισσας'
    | 'Ευρυτανίας'
    | 'Λιβαδειάς'
    | 'Λάρισας'
    | 'Βόλου'
    | 'Καρδίτσας'
    | 'Τρικάλων'
    | 'Ναυπλίου'
    | 'Κορίνθου'
    | 'Σπάρτης'
    | 'Τρίπολης'
    | 'Πατρών'
    | 'Αιγίου'
    | 'Αμαλιάδας'
    | 'Ζακύνθου'
    | 'Ηλείας'
    | 'Καλαβρύτων'
    | 'Κεφαλληνίας'
    | 'Αγρινίου'
    | 'Λευκάδας'
    | 'Μεσολογίου'
    | 'Πειραιά'
    | 'Καλαμάτας'
    | 'Κυπαρισσίας'
    | 'Γυθείου';
};

export const allProtodikeia = [
  'Αθηνών',
  'Θηβών',
  'Χαλκίδας',
  'Σύρου',
  'Σάμου',
  'Νάξου',
  'Μυτιλήνης',
  'Χίου',
  'Κοζάνης',
  'Γρεβενών',
  'Καστοριάς',
  'Φλώρινας',
  'Ρόδου',
  'Κω',
  'Θεσσαλονίκης',
  'Βέροιας',
  'Έδεσσας',
  'Κατερίνης',
  'Κιλκίς',
  'Σερρών',
  'Χαλκιδικής',
  'Γιαννιτσών',
  'Ροδόπης',
  'Δράμας',
  'Έβρου',
  'Καβάλας',
  'Ξάνθης',
  'Ορεστιάδας',
  'Ιωαννίνων',
  'Άρτας',
  'Πρέβεζας',
  'Κέρκυρας',
  'Θεσπρωτίας',
  'Χανίων',
  'Ρεθύμνης',
  'Ηρακλείου',
  'Λασιθίου',
  'Λαμίας',
  'Άμφισσας',
  'Ευρυτανίας',
  'Λιβαδειάς',
  'Λάρισας',
  'Βόλου',
  'Καρδίτσας',
  'Τρικάλων',
  'Ναυπλίου',
  'Κορίνθου',
  'Σπάρτης',
  'Τρίπολης',
  'Πατρών',
  'Αιγίου',
  'Αμαλιάδας',
  'Ζακύνθου',
  'Ηλείας',
  'Καλαβρύτων',
  'Κεφαλληνίας',
  'Αγρινίου',
  'Λευκάδας',
  'Μεσολογίου',
  'Πειραιά',
  'Καλαμάτας',
  'Κυπαρισσίας',
  'Γυθείου',
];

export function getProtOfEir(eirinodikeio: string) {
  const efeteio = dikastiria.filter(r => {
    return r?.protovathmia
      .map(k => k.eirinodikeia)
      .flat()
      .includes(eirinodikeio);
  })[0];
  const protodikeio = efeteio?.protovathmia.filter(r =>
    r.eirinodikeia.includes(eirinodikeio)
  )[0].protodikeio;
  return protodikeio ? protodikeio : 'Δεν βρέθηκε';
}

export function removeEirinodikeia(eirinodikeia: string[]) {
  const arr: {
    protodikeio: string;
    eirinodikeia: string[];
    exceptions: string[];
  }[] = [];
  const protovathmia = dikastiria.map(r => r.protovathmia).flat();
  protovathmia.forEach(r => {
    let obj: {
      protodikeio: string;
      eirinodikeia: string[];
      exceptions: string[];
    } = {
      protodikeio: '',
      eirinodikeia: [],
      exceptions: [],
    };
    eirinodikeia.forEach(k => {
      if (r.eirinodikeia.includes(k)) {
        obj.protodikeio = r.protodikeio;
        obj.eirinodikeia = r.eirinodikeia;
        obj.exceptions.push(k);
      }
    });
    if (obj.exceptions.length !== 0) {
      arr.push(obj);
    }
  });
  const arrFiltered: {
    protodikeio: string;
    eirinodikeia: string[];
    exceptions: string[];
  }[] = [];
  arr.forEach(r => {
    let obj: {
      protodikeio: string;
      eirinodikeia: string[];
      exceptions: string[];
    } = {
      protodikeio: r.protodikeio,
      eirinodikeia: [],
      exceptions: r.exceptions,
    };
    obj.eirinodikeia = r.eirinodikeia.filter(k => !r.exceptions.includes(k));
    arrFiltered.push(obj);
  });
  return arrFiltered;
}

export function dikastiriaFromProtovathmiaObj(
  protovathmia: {
    protodikeio: string;
    eirinodikeia: string[];
    exceptions?: string[];
  }[]
) {
  const arr: string[][] = [];
  protovathmia.forEach(r => {
    const singleArr = [];
    singleArr.push(`Πολ ${r.protodikeio}`);

    singleArr.push(`Μον ${r.protodikeio}`);
    singleArr.push(...r.eirinodikeia.map(k => `Ειρ ${k}`));
    arr.push(singleArr);
  });
  return arr.flat();
}

export function normalizePeriohesWithExceptions(
  periohes: any,
  exceptions?: string[]
) {
  let exc = exceptions ? exceptions : [];
  const includedAfterExceptions = dikastiriaFromProtovathmiaObj(
    removeEirinodikeia(exc)
  );

  const protodikeiaIncluded = includedAfterExceptions
    .filter(r => r.includes('Πολ '))
    .map(k => k.replace('Πολ ', ''));
  const periohesFiltered = periohes?.filter(
    (r: string) => !protodikeiaIncluded.includes(r)
  );

  const protovathmiaFromPeriohes = dikastiria
    .map(r => r.protovathmia)
    .flat()
    .filter(k => periohesFiltered?.includes(k.protodikeio));

  const polMonEirAddedToPeriohes = dikastiriaFromProtovathmiaObj(
    protovathmiaFromPeriohes
  );
  const arr = [...polMonEirAddedToPeriohes, ...includedAfterExceptions];
  if (periohes.includes('all')) {
    arr.push('all');
  }

  return arr;
}

export function checkIfIncluded(topiki: string, periohes: string[]) {
  if (periohes.includes('all')) {
    return true;
  }
  if (periohes.includes(topiki)) {
    return true;
  }
  if (!periohes.includes(topiki)) {
    const topikiWithoutDikast = topiki
      .replace('Ειρ ', '')
      .replace('Μον ', '')
      .replace('Πολ ', '');
    if (periohes.includes(topikiWithoutDikast)) {
      return true;
    }
    if (!periohes.includes(topikiWithoutDikast)) {
      if (periohes.includes(getProtOfEir(topikiWithoutDikast))) {
        return true;
      }
    }
  }
  return false;
}

export function getAnastolesAnaDikastirio(
  dikastirio: string,
  eidos: string,
  yliki?: string
) {
  let ylikiDefault = 'Μον';
  if (yliki !== undefined) {
    ylikiDefault = yliki;
  }
  let fixedDikastirio = `${ylikiDefault} ${dikastirio}`;

  return legalAnalysis
    .filter(r =>
      checkIfIncluded(
        fixedDikastirio,
        normalizePeriohesWithExceptions(r.periohes, r.exceptions)
      )
    )
    .filter(i => i.eidos.includes(eidos) || i.eidos.includes('all'))
    .map(k => {
      return [...returnDatesBetween(k.dates_start, k.dates_end)];
    })
    .flat();
}
export function barbaraGetAnastolesAnaDikastirio(
  dikastirio: string,
  eidos: string,
  yliki?: string
) {
  let ylikiDefault = 'Μον';
  if (yliki !== undefined) {
    ylikiDefault = yliki;
  }
  let fixedDikastirio = `${ylikiDefault} ${dikastirio}`;

  return barbaraLegalAnalysis
    .filter(r =>
      checkIfIncluded(
        fixedDikastirio,
        normalizePeriohesWithExceptions(r.periohes, r.exceptions)
      )
    )
    .filter(i => i.eidos.includes(eidos) || i.eidos.includes('all'))
    .map(k => {
      return [...returnDatesBetween(k.dates_start, k.dates_end)];
    })
    .flat();
}

export function danielGetAnastolesAnaDikastirio(
  dikastirio: string,
  eidos: string,
  yliki?: string
) {
  let ylikiDefault = 'Μον';
  if (yliki !== undefined) {
    ylikiDefault = yliki;
  }
  let fixedDikastirio = `${ylikiDefault} ${dikastirio}`;

  return danielLegalAnalysis
    .filter(
      r =>
        checkIfIncluded(
          fixedDikastirio,
          normalizePeriohesWithExceptions(r.periohes, r.exceptions)
        ) || r.periohes.includes(fixedDikastirio)
    )
    .filter(i => i.eidos.includes(eidos) || i.eidos.includes('all'))
    .map(k => {
      return [...returnDatesBetween(k.dates_start, k.dates_end)];
    })
    .flat();
}
