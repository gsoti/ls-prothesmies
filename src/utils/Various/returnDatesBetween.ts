  export function returnDatesBetween(start: string, end: string) {
    const ds = new Date(start);
    const de = new Date(end);
    let arr = [];

    for (let dt = ds; dt <= de; dt.setTime(dt.getTime() + 86400000)) {
      arr.push(new Date(dt));
    }
    return arr.map(v => v.toISOString().slice(0, 10));
  }
