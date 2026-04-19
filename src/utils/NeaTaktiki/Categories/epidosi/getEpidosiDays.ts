export const getEpidosiDays = (
  katathesi: string,
  exoterikou?: boolean
): number => {
  if (new Date(katathesi).getTime() >= new Date('2026-01-01').getTime()) {
    return 30;
  }

  return exoterikou ? 60 : 30;
};
