import { dikastiria } from './dikastiria';
import { codes } from './codes';

export function getCode(dikastirio: string) {
  let efeteio = '';
  let index = -1;
  let code = '';
  efeteio = dikastiria.filter(r =>
    r.protovathmia
      .filter(i => i.protodikeio)
      .map(k => k.protodikeio)
      .includes(dikastirio)
  )[0].efeteio;
  index = dikastiria
    .filter(r => r.efeteio === efeteio)[0]
    .protovathmia.findIndex(i => i.protodikeio === dikastirio);
  code = codes.filter(r => r.efeteio === efeteio)[0].protovathmia[index]
    .protodikeio;
  return code;
}
