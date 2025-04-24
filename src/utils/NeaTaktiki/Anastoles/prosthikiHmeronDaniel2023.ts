import { getProtOfEir } from '../../Dikastiria/dikastiria';

const periohes = ['Βόλου', 'Τρικάλων', 'Καρδίτσας'];

export function danielCheckIfIncludedSingle(topiki: string) {
  if (topiki.includes('Φαρσάλων')) {
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
export function danielCheckIfIncludedSingle2(topiki: string) {
  if (!topiki.includes('Φαρσάλων')) {
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
