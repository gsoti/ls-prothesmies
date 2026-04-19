import { describe, expect, it } from 'vitest';
import { CivilCaseInput, LawcaseAPI } from './lawcase/api';

describe('LawcaseAPI', () => {
  it('transforms custom civil-case input into request parameters', () => {
    const api = new LawcaseAPI();
    const customInput: CivilCaseInput = {
      civilCase: {
        imerominia_katathesis: '28-03-2024',
        dikasimos: '28-04-2025',
      },
      dimosio: true,
      exoterikou: false,
      klisi: false,
      topiki: 'Αθηνών',
    };

    expect(api.transformInputToParams(customInput)).toEqual({
      date: '28-03-2024',
      eidos: 1,
      diad: 1,
      kat: 1,
      dhmosio: 2,
      dwsidikia: 193,
      kathulhn: 'Eir',
      agwghpar: 0,
      hmerdik: 1,
      hm_dikasimou: '28-04-2025',
      Ν4842: 1,
      klhsh: 0,
    });
  });
});
