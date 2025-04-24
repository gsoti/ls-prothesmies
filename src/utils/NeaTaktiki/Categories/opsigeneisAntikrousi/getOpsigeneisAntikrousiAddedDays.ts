import { analyseArgiesReverse } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';
import { Options } from '../../Types/interfaces';
import { reverseDate } from '../../../Various/reverseDate';
import {
  barbaraGetAnastolesAnaDikastirio,
  danielGetAnastolesAnaDikastirio,
  getAnastolesAnaDikastirio,
} from '../../../Dikastiria/dikastiria';

// interface Options {
//   dimosio?: boolean;
// }
export const getOpsigeneiAntikrousisAddedDays = (
  start: string,
  options: Options
) => {
  let days = 10;
  let argiesDimosiou: string[] = [];

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }

  let text: {
    nomothesia: string[];
    ypologismos: string[];
    imeres: string[];
  } = { nomothesia: [], ypologismos: [], imeres: [] };

  let topiki = options?.topiki ?? 'Αθηνών';

  const year = parseInt(start.slice(0, 4));

  const argia = analyseArgiesReverse(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [
      ...getAnastolesAnaDikastirio(
        topiki,
        'opsigeneis_antikrousi',
        options?.yliki
      ),
      ...argiesDimosiou,
    ]),
    ...barbaraGetAnastolesAnaDikastirio(
      topiki,
      'opsigeneis_antikrousi',
      options?.yliki
    ),
    ...danielGetAnastolesAnaDikastirio(
      topiki,
      'opsigeneis_antikrousi',
      options?.yliki
    ),
  });

  let dayOfWeek = '';
  if (new Date(argia).getDay() === 0) {
    dayOfWeek = ' (Κυριακή)';
  }
  if (new Date(argia).getDay() === 6) {
    dayOfWeek = ' (Σάββατο)';
  }

  if (argia) {
    text.ypologismos.push(
      `Επειδή η ${reverseDate(
        argia
      )} είναι αργία${dayOfWeek}, η ημερομήνια μετατέθηκε στην προηγούμενη εργάσιμη.`
    );
  }

  text.imeres.push(
    `Με προσθήκη στις προτάσεις το αργότερο δέκα (${days}) ημέρες πριν από την ορισθείσα συζήτηση (Βλ. άρθρο 237§5 εδ.α΄ ΚΠολΔ). ημέρες από την κατάθεση της αγωγής.`
  );

  return text;
};
