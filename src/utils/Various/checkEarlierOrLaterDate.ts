export function earlierThan(start: string, isEarlier: string) {
  if (
    parseInt(start.replaceAll('-', '')) >
    parseInt(isEarlier.replaceAll('-', ''))
  ) {
    return true;
  } else {
    return false;
  }
}
export function laterThan(start: string, isLater: string) {
  if (
    parseInt(start.replaceAll('-', '')) < parseInt(isLater.replaceAll('-', ''))
  ) {
    return true;
  } else {
    return false;
  }
}

export function startBetweenDiakopDimosiou(between: string) {
  const year = between.split('-')[0];
  if (year === '2021' || year === '2020') {
    return (
      (!earlierThan(`2021-07-16`, between) &&
        !laterThan(`2021-08-31`, between)) ||
      (!earlierThan(`2020-07-16`, between) && !laterThan(`2020-08-31`, between))
    );
  } else {
    return (
      !earlierThan(`${year}-07-01`, between) &&
      !laterThan(`${year}-09-15`, between)
    );
  }
}
export function startBetweenDiakopes(between: string) {
  const year = between.split('-')[0];

  return (
    !earlierThan(`${year}-08-01`, between) &&
    !laterThan(`${year}-08-31`, between)
  );
}

export function isAugustBetween(start: string, end: string) {
  const year = end.split('-')[0];
  const yearBefore = (parseInt(year) - 1).toString();
  return (
    (!earlierThan(start, `${year}-08-15`) &&
      !laterThan(end, `${year}-08-15`)) ||
    (!earlierThan(start, `${yearBefore}-08-15`) &&
      !laterThan(end, `${yearBefore}-08-15`))
  );
}

export function checkIfAnastoliDiakopon(
  start: string,
  prothesmia: any,
  dimosio?: boolean
) {
  if (!dimosio) {
    if (!startBetweenDiakopes(start)) {
      return isAugustBetween(start, prothesmia);
    } else {
      return false;
    }
  }
  if (dimosio) {
    if (!startBetweenDiakopDimosiou(start)) {
      return isAugustBetween(start, prothesmia);
    } else {
      return false;
    }
  } else return false;
}
