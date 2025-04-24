export function kinitesArgiesFunc(year: number) {
  let e = 10;

  if (year > 1600) {
    let y2 = Math.floor(year / 100);
    e = 10 + y2 - 16 - Math.floor((y2 - 16) / 4);
  }
  if (year < 1583) {
    e = 0;
  }
  let G = year % 19;
  let I = (19 * G + 15) % 30;
  let J = (year + Math.floor(year / 4) + I) % 7;
  let L = I - J;
  let p = L + e;
  let d = 1 + ((p + 27 + Math.floor((p + 6) / 40)) % 31);
  let m = 3 + Math.floor((p + 26) / 30) - 1;
  let oneDay = 60 * 1000 * 60 * 24;
  let pascha = new Date(Date.UTC(year, m, d));
  let katharaDeftera = new Date(pascha.getTime() + oneDay * -48)
    .toISOString()
    .split('T')[0];
  let megParaskevi = new Date(pascha.getTime() + oneDay * -2)
    .toISOString()
    .split('T')[0];
  let deftPascha = new Date(pascha.getTime() + oneDay)
    .toISOString()
    .split('T')[0];
  let agiouPnefmatos = new Date(pascha.getTime() + oneDay * 50)
    .toISOString()
    .split('T')[0];

  return [katharaDeftera, megParaskevi, deftPascha, agiouPnefmatos];
}
