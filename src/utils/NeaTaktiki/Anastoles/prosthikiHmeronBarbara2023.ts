import { getProtOfEir } from '../../Dikastiria/dikastiria';

const periohes = ['Πειραιά', 'Αθηνών', 'Θηβών', 'Χαλκίδας'];

export function barbaraCheckIfIncludedSingle(topiki: string) {
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
