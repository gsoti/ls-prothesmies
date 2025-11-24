import { Topiki } from "../utils/NeaTaktiki/Types/interfaces";

/**
 * Maps common variations of location names to their standardized Topiki format
 */
const locationMappings: Record<string, Topiki> = {
    'ΑΘΗΝΩΝ': 'Αθηνών',
    'ΑΧΑΡΝΩΝ': 'Αχαρνών',
    'ΑΜΑΡΟΥΣΙΟΥ': 'Αμαρoυσίoυ',
    'ΝΕΑΣ ΙΩΝΙΑΣ': 'Ν. Iωvίας',
    'ΧΑΛΑΝΔΡΙΟΥ': 'Χαλαvδρίoυ',
    'ΚΡΩΠΙΑΣ': 'Κρωπίας',
    'ΠΕΡΙΣΤΕΡΙΟΥ': 'Περιστερίoυ',
    'ΘΕΣΣΑΛΟΝΙΚΗΣ': 'Θεσσαλονίκης',
    'ΠΕΙΡΑΙΑ': 'Πειραιά',
    'ΧΑΛΚΙΔΑΣ': 'Χαλκίδας',
    'ΕΥΒΟΙΑΣ': 'Χαλκίδας', // Mapping the region to its capital
    'ΝΕΩΝ ΛΙΟΣΙΩΝ': 'Ν. Λιoσίωv',
    'ΛΑΥΡΙΟΥ': 'Λαυρίoυ',
    'ΜΑΡΑΘΩΝΟΣ': 'Μαραθώvoς',
    'ΜΕΓΑΡΩΝ': 'Μεγάρωv',
    'ΛΑΡΙΣΑΣ': 'Λάρισας',
    'ΙΩΑΝΝΙΝΩΝ': 'Ιωαννίνων'
  };
  
  /**
   * Normalizes a Greek string by converting to lowercase, removing diacritical marks,
   * and standardizing certain characters.
   * 
   * @param text - The Greek text to normalize
   * @returns - The normalized Greek text
   */
  function normalizeGreekText(text: string): string {
    // Convert to lowercase
    const lowercased = text.toLowerCase();
    
    // Replace diacritical marks
    const withoutDiacritics = lowercased
      .replace(/ά/g, 'α')
      .replace(/έ/g, 'ε')
      .replace(/ή/g, 'η')
      .replace(/ί/g, 'ι')
      .replace(/ό/g, 'ο')
      .replace(/ύ/g, 'υ')
      .replace(/ώ/g, 'ω')
      .replace(/ϊ/g, 'ι')
      .replace(/ϋ/g, 'υ')
      .replace(/ΐ/g, 'ι')
      .replace(/ΰ/g, 'υ');
    
    return withoutDiacritics;
  }
  
  /**
   * Finds the matching Topiki value for a given location name.
   *
   * @param location - The location name to find in the Topiki list
   * @returns - The matching Topiki value or 'Αθηνών' (Athens) as default if no match is found
   */
  function findMatchingTopiki(location: string): Topiki {
    // for mysolon court handling
    if (location === 'ΠΕΙΡΑΙΩΣ') location = 'ΠΕΙΡΑΙΑ';
    
    // First check direct mapping
    if (locationMappings[location]) {
      return locationMappings[location];
    }
    
    // Create a normalized version of the input for fuzzy matching
    const normalizedLocation = normalizeGreekText(location);
    
    // Create a list of all possible Topiki values
    const allTopikiValues = Object.values(locationMappings) as Topiki[];
    
    // Add all valid Topiki values that are not in the mapping
    const validTopikiType: Topiki[] = [
      'Αθηνών', 'Θεσσαλονίκης', 'Πειραιά', 'Χαλκίδας', 'Αχαρνών', 'Αμαρoυσίoυ', 
      'Ν. Iωvίας', 'Χαλαvδρίoυ', 'Κρωπίας', 'Περιστερίoυ',
      // All the other Topiki values would be listed here
    ];
    
    // Add any missing Topiki values
    for (const value of validTopikiType) {
      if (!allTopikiValues.includes(value)) {
        allTopikiValues.push(value);
      }
    }
    
    // Try to find a match by normalizing both strings
    for (const topiki of allTopikiValues) {
      if (normalizeGreekText(topiki) === normalizedLocation) {
        return topiki;
      }
    }

    // If no match is found, log a warning and return Athens as default
    console.warn(`[topiki] No match found for location: "${location}". Using default value "Αθηνών".`);
    return 'Αθηνών';
  }
  
  /**
   * Transforms a court string into the corresponding Topiki value.
   * 
   * @param courtString - The court string to transform
   * @returns - The corresponding Topiki value
   */
  function transformCourtToTopiki(courtString: string): Topiki {
    // If the string is empty, return empty Topiki
    if (!courtString) {
      return '';
    }
    
    // Special case for "ΑΡΕΙΟΣ ΠΑΓΟΣ" (Supreme Court)
    if (courtString === "ΑΡΕΙΟΣ ΠΑΓΟΣ") {
      return 'Αθηνών'; // Supreme Court is in Athens
    }
    
    // Extract location from a court string
    const extractLocation = (court: string): string => {
      // First, try to match patterns like "ΕΦΕΤΕΙΟ ΑΘΗΝΩΝ" or "ΠΡΩΤΟΔΙΚΕΙΟ ΘΕΣΣΑΛΟΝΙΚΗΣ"
      const simpleMatch = court.match(/(?:ΕΦΕΤΕΙΟ|ΠΡΩΤΟΔΙΚΕΙΟ|ΕΙΡΗΝΟΔΙΚΕΙΟ)\s+([^\s()]+)/);
      if (simpleMatch && simpleMatch[1]) {
        return simpleMatch[1];
      }
      
      // Try to match complex patterns with parentheses
      const complexMatch = court.match(/\(ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ\s+([^\s()]+)\)/);
      if (complexMatch && complexMatch[1]) {
        return complexMatch[1];
      }
      
      // Try to extract from peripheral court patterns
      const peripheralMatch = court.match(/ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ\s+([^\s()]+)/);
      if (peripheralMatch && peripheralMatch[1]) {
        return peripheralMatch[1];
      }
      
      // If none of the patterns match, return an empty string
      return '';
    };
    
    // Extract the location from the court string
    const location = extractLocation(courtString);
    
    // Find the matching Topiki value
    return findMatchingTopiki(location);
  }
  
  /**
   * A more advanced implementation that handles a wider variety of court strings
   * by attempting to extract the location through multiple patterns and strategies.
   * 
   * @param courtString - The court string to transform
   * @returns - The corresponding Topiki value
   */
  function advancedCourtToTopiki(courtString: string): Topiki {
    // If the string is empty, return empty Topiki
    if (!courtString) {
      throw new Error('[topiki] Empty court string provided');
    }
    
    // Special case for "ΑΡΕΙΟΣ ΠΑΓΟΣ" (Supreme Court)
    if (courtString === "ΑΡΕΙΟΣ ΠΑΓΟΣ") {
      return 'Αθηνών'; // Supreme Court is in Athens
    }
    
    // Regular expressions to match different patterns in court names
    // const patterns = [
    //   // Match "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)"
    //   /\(ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ\s+([^)\s]+)\)/,
  
    //   // Match "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)"
    //   /\(ΕΙΡΗΝΟΔΙΚΕΙΟ\s+([^)\s]+)\)/,
  
    //   // Match "ΕΦΕΤΕΙΟ ΑΘΗΝΩΝ", "ΠΡΩΤΟΔΙΚΕΙΟ ΘΕΣΣΑΛΟΝΙΚΗΣ", etc.
    //   /(?:ΕΦΕΤΕΙΟ|ΠΡΩΤΟΔΙΚΕΙΟ|ΕΙΡΗΝΟΔΙΚΕΙΟ)\s+([^(\s]+)/,
      
    //   // Match "ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΑΜΑΡΟΥΣΙΟΥ"
    //   /ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ\s+([^(\s]+)/,
      
    //   // Match any location name in parentheses after a court name
    //   /[^(]+\(([^)]+)\)/,
    // ];
  
    // Regular expressions to match different patterns in court names
    const patterns = [
      // Match "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)"
      /\(ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ\s+(.+?)\)/,
      
      // Match "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)"
      // This is how mysolon has it
      /\(ΕΙΡΗΝΟΔΙΚΕΙΟ\s+(.+?)\)/,
      
      // Match "ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΑΜΑΡΟΥΣΙΟΥ"
      /ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ\s+(.+?)(?:\s*\(|$)/,
      
      // Match any location name in parentheses after a court name
      /[^(]+\((.+?)\)/,
      
      // Match "ΕΦΕΤΕΙΟ ΑΘΗΝΩΝ", "ΠΡΩΤΟΔΙΚΕΙΟ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΕΙΡΗΝΟΔΙΚΕΙΟ ΝΕΑΣ ΙΩΝΙΑΣ", etc.
      // This is modified to capture everything after the court type until an opening parenthesis or end of string
      /(?:ΕΦΕΤΕΙΟ|ΠΡΩΤΟΔΙΚΕΙΟ|ΕΙΡΗΝΟΔΙΚΕΙΟ)\s+(.+?)(?:\s*\(|$)/
    ];
    
    // Try each pattern until a match is found
    let location = '';
    for (const pattern of patterns) {
      const match = courtString.match(pattern);
      if (match && match[1]) {
        location = match[1];
        break;
      }
    }
    
    // If no match is found through patterns, try to extract the last word
    if (!location) {
      const words = courtString.split(/\s+/);
      if (words.length > 1) {
        location = words[words.length - 1].replace(/[()]/g, '');
      }
    }
    
    // Find the matching Topiki value
    return findMatchingTopiki(location);
  }
  
  // Export the functions
  export { 
    transformCourtToTopiki, 
    advancedCourtToTopiki,
    normalizeGreekText,
    findMatchingTopiki,
  };
  
  // Example usage:
  /*
  const courts = [
    "ΑΡΕΙΟΣ ΠΑΓΟΣ",
    "ΕΦΕΤΕΙΟ ΑΘΗΝΩΝ",
    "ΕΦΕΤΕΙΟ ΕΥΒΟΙΑΣ",
    "ΕΦΕΤΕΙΟ ΠΕΙΡΑΙΩΣ",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΘΗΝΩΝ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΧΑΡΝΩΝ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ - ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΑΜΑΡΟΥΣΙΟΥ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΑΜΑΡΟΥΣΙΟΥ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ - ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΑΜΑΡΟΥΣΙΟΥ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΝΕΑΣ ΙΩΝΙΑΣ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ - ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΑΜΑΡΟΥΣΙΟΥ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΧΑΛΑΝΔΡΙΟΥ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ - ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΚΡΩΠΙΑΣ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΚΡΩΠΙΑΣ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΑΘΗΝΩΝ - ΠΕΡΙΦΕΡΕΙΑΚΗ ΕΔΡΑ ΠΕΡΙΣΤΕΡΙΟΥ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΠΕΡΙΣΤΕΡΙΟΥ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΘΕΣΣΑΛΟΝΙΚΗΣ",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΠΕΙΡΑΙΑ",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΠΕΙΡΑΙΑ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΠΕΙΡΑΙΑ)",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΧΑΛΚΙΔΑΣ",
    "ΠΡΩΤΟΔΙΚΕΙΟ ΧΑΛΚΙΔΑΣ (ΠΡΩΗΝ ΕΙΡΗΝΟΔΙΚΕΙΟ ΧΑΛΚΙΔΑΣ)"
  ];
  
  courts.forEach(court => {
    console.log(`${court} => ${advancedCourtToTopiki(court)}`);
  });
  */