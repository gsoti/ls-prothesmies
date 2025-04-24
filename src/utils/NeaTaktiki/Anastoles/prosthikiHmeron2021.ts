import { getProtOfEir } from '../../Dikastiria/dikastiria';

const periohes = [
  'Πειραιά',
  'Αθηνών',
  'Θεσσαλονίκης',
  'Ρόδου',
  'Ηρακλείου',
  'Λιβαδειάς',
  'Θηβών',
  'Σάμου',
  'Σύρου',
  'Κατερίνης',
  'Χαλκιδικής',
  'Ευρυτανίας',
  'Μυτιλήνης',
  'Χίου',
  'Άρτας',
  'Θεσπρωτίας',
  'Λαμίας',
  'Άμφισσας',
  'Ναυπλίου',
  'Κορίνθου',
  'Αγρινίου',
  'Λευκάδας',
  'Μεσολογίου',
  'Σάμου',
  'Λασιθίου',
  'Τρίπολης',
  'Πατρών',
  'Καλαβρύτων',
  'Αιγίου',
  'Ζακύνθου',
  'Πολ Χανίων',
  'Μον Χανίων',
  'Ειρ Χανίων',
  'Πολ Ιωαννίνων',
  'Μον Ιωαννίνων',
  'Ειρ Ιωαννίνων',
  'Ειρ Μετσόβου',
  'Ειρ Μυκόνου',
  'Πολ Κατερίνης',
  'Μον Κατερίνης',
  'Ειρ Πιερίας',
  'Πολ Χαλκίδας',
  'Μον Χαλκίδας',
  'Ειρ Χαλκίδας',
  'Ειρ Αγίας Άννας',
  'Ειρ Αυλωναρίου',
  'Ειρ Ιστιαίας',
  'Ειρ Καρύστου',
  'Ειρ Κύμης',
  'Ειρ Λίμνης',
  'Ειρ Ταμινέων',
  'Ειρ Ροδολίβους',
  'Ειρ Σκιάθου',
  'Πολ Καστοριάς',
  'Μον Καστοριάς',
  'Ειρ Καστοριάς',
  'Ειρ Κλεισούρας',
];

export function checkIfIncludedSingle(topiki: string) {
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
