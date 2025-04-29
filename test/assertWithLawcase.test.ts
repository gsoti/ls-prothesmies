import { CivilCaseInput, LawcaseAPI } from "./lawcase/api";

describe('Assert our prothesmies against LawcaseAPI', () => {
    it('should produce the same deadlines', async () => {
        const api = new LawcaseAPI();

        try {
            // Using the new custom input structure
            const customInput: CivilCaseInput = {
                civilCase: {
                    imerominia_katathesis: '28-03-2024',
                    dikasimos: '28-04-2025'
                },
                dimosio: true,
                exoterikou: false,
                klisi: false,
                topiki: 'Αθηνών'
            };

            // Transform the input to LawcaseRequestParams
            const transformedParams = api.transformInputToParams(customInput);
            console.log('Transformed Parameters:', transformedParams);

            // Or make a request directly with the custom input
            const inputResponse = await api.makeRequestFromInput(customInput);
            console.log('Input Response:', inputResponse.data);
        } catch (error) {
            console.error('Error in example:', error);
        }
    });
})