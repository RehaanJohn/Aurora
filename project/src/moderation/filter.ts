// Basic profanity filter
const profanityList = [
  "fuck", "fucking", "fucked", "fucker", "shit", "shitting", "damn", 
  "bitch", "bitches", "asshole", "bastard", "dick", "pussy", "cock", 
  "cunt", "fag", "faggot", "nigger", "nigga", "retard", "retarded",
  "slut", "whore", "piss", "pissed", "ass", "hell", "crap",
  "motherfucker", "bullshit", "dumbass", "dipshit"
];

// Context patterns that indicate harmful intent
const harmfulPatterns = [
  // Direct insults
  /you'?re?\s+(a\s+)?(fucking\s+)?(\w+\s+)*(useless|stupid|idiot|dumb|worthless|pathetic|loser)/i,
  /fuck\s+you/i,
  /go\s+(to\s+)?hell/i,
  /kill\s+yourself/i,
  /kys/i,
  /die/i,
  
  // Hate speech patterns
  /i\s+hate\s+you/i,
  /you\s+suck/i,
  /piece\s+of\s+shit/i,
  
  // Threats
  /gonna\s+kill/i,
  /will\s+kill/i,
  /going\s+to\s+kill/i,
];

// Positive/neutral contexts that suggest casual use
const positivePatterns = [
  /this\s+is\s+fucking\s+(awesome|amazing|great|good|cool|incredible)/i,
  /so\s+fucking\s+(good|great|cool|nice|awesome|amazing)/i,
  /holy\s+shit/i,
  /oh\s+shit/i,
  /fucking\s+(love|like)/i,
  /damn\s+(good|cool|nice)/i,
];

export interface FilterResult {
  blocked: boolean;
  cleaned: string;
  detected: string[];
  isHarmful?: boolean; // New field to indicate if context is harmful
}

/**
 * Check if a message contains profanity and analyze context
 * Returns the cleaned message, detected words, and harmful intent
 */
export function checkMessage(message: string): FilterResult {
  const lowerMessage = message.toLowerCase();
  const detected: string[] = [];
  let cleaned = message;
  let isHarmful = false;

  // Check for profanity with improved regex that handles contractions and punctuation
  profanityList.forEach(word => {
    // Use a more flexible pattern that allows word characters or apostrophes before/after
    // This catches "you're fucking" as well as "fucking awesome"
    const regex = new RegExp(`(?:^|[\\s,\\.!?;:'"\\(\\)\\[\\]{}])${word}(?=[\\s,\\.!?;:'"\\(\\)\\[\\]{}]|$)`, 'gi');
    
    const matches = lowerMessage.match(regex);
    if (matches && matches.length > 0) {
      detected.push(word);
      // Replace with asterisks, preserving surrounding characters
      cleaned = cleaned.replace(new RegExp(`(^|[\\s,\\.!?;:'"\\(\\)\\[\\]{}])(${word})(?=[\\s,\\.!?;:'"\\(\\)\\[\\]{}]|$)`, 'gi'), 
        (_match, prefix) => prefix + '*'.repeat(word.length));
    }
  });

  // If profanity detected, check context
  if (detected.length > 0) {
    // Check if it's a positive/casual context (should ALLOW)
    const isPositive = positivePatterns.some(pattern => pattern.test(message));
    
    // Check if it's a harmful context (should BLOCK)
    const matchesHarmfulPattern = harmfulPatterns.some(pattern => pattern.test(message));
    
    // Mark as harmful if it matches harmful patterns and NOT positive patterns
    isHarmful = matchesHarmfulPattern && !isPositive;
  }

  return {
    blocked: detected.length > 0,
    cleaned,
    detected,
    isHarmful
  };
}
