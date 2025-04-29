/**
 * LawcaseAPI Client
 * 
 * A TypeScript client for interacting with the Lawcase.gr API
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Topiki } from '../../src/utils/NeaTaktiki/Types/interfaces';
import { topikiToValue } from './utils';

/**
 * Interface for the civil case input structure
 */
export interface CivilCaseInput {
  civilCase: {
    imerominia_katathesis: string;  // Filing date
    dikasimos?: string;             // Court date (optional)
  };
  dimosio: boolean;         // Public parameter
  exoterikou: boolean;      // Foreign parameter
  klisi: boolean;           // Call parameter
  topiki: Topiki;           // Topical jurisdiction
}

/**
 * Interface for the request parameters used in the API calls
 */
interface LawcaseRequestParams {
  date: string;                // Format: DD-MM-YYYY
  eidos: number;               // Type parameter
  diad: number;                // Procedure parameter
  kat: number;                 // Category parameter
  dhmosio: number;             // Public parameter (1 or 0)
  dwsidikia: number;           // Jurisdiction parameter (1 or 0)
  kathulhn: string;            // Court type
  agwghpar: number;            // Litigation parameter (1 or 0)
  hmerdik: number;             // Court day parameter (1 or 0)
  hm_dikasimou: string;        // Court date (Format: DD-MM-YYYY)
  //'Ν4842'?: number;              // Law parameter (1 or 0)
  klhsh: number;               // Call parameter (1 or 0)
  [key: string]: string | number; // Allow for any additional parameters
}

/**
 * LawcaseAPI client for making requests to the Lawcase.gr API
 */
export class LawcaseAPI {
  private client: AxiosInstance;
  private baseUrl: string = 'https://lawcase.gr';
  
  /**
   * Constructor for the LawcaseAPI client
   */
  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
        'Referer': 'https://lawcase.gr/compute/taktikh',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  /**
   * Convert parameters object to URL encoded form data
   * 
   * @param params The parameters to convert
   * @returns URL encoded string
   */
  private objectToFormData(params: LawcaseRequestParams): string {
    return Object.keys(params)
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].toString())}`;
      })
      .join('&');
  }

  /**
   * Make a request to the "Ajax_taktikh/request" endpoint
   * 
   * @param params The parameters to send with the request
   * @returns Promise with the response data
   */
  public async makeRequest(params: LawcaseRequestParams): Promise<AxiosResponse<any>> {
    const formData = this.objectToFormData(params);
    
    try {
      const response = await this.client.post('/Ajax_taktikh/request', formData);
      return response;
    } catch (error) {
      console.error('Error making request to LawcaseAPI:', error);
      throw error;
    }
  }
  
  /**
   * Transform the custom input structure to the LawcaseRequestParams format
   * 
   * @param input The custom input object
   * @returns Transformed LawcaseRequestParams object
   */
  public transformInputToParams(input: CivilCaseInput): LawcaseRequestParams {
    // Set defaults for required parameters
    const params: LawcaseRequestParams = {
      date: input.civilCase.imerominia_katathesis,  // Use filing date as the date parameter
      eidos: 1,       // Default type (civil case)
      diad: 1,        // Default procedure
      kat: input.exoterikou ? 2 : 1,
      dhmosio: input.dimosio ? 2 : 1,
      dwsidikia: topikiToValue(input.topiki),
      kathulhn: 'Eir',
      agwghpar: 0,  // 0 or 1
      hmerdik: input.civilCase.dikasimos ? 1 : 0, // If court date is provided, set to 1
      hm_dikasimou: input.civilCase.dikasimos || input.civilCase.imerominia_katathesis, 
      'Ν4842': 1,     // Default law parameter
      klhsh: input.klisi ? 1 : 0  // Convert boolean to 1/0
    };
    
    return params;
  }
  
  /**
   * Make a request using the custom input structure
   * 
   * @param input The custom input object
   * @returns Promise with the response data
   */
  public async makeRequestFromInput(input: CivilCaseInput): Promise<AxiosResponse<any>> {
    const params = this.transformInputToParams(input);
    return this.makeRequest(params);
  }
}