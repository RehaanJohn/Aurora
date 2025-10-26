import { checkMessage } from "./filter";
import { analyzeMessage } from "./aiAgent";

export interface ModerationDecision {
  allowed: boolean;
  cleanedMessage: string;
  reason?: string;
  categories?: string[];
}

/**
 * Combined moderation system:
 * 1. First runs basic profanity filter with context analysis
 * 2. If profanity detected, uses AI to analyze intent (if available)
 * 3. Falls back to pattern-based detection if AI fails
 * 4. Returns final decision
 */
export async function moderateMessage(message: string): Promise<ModerationDecision> {
  // Step 1: Run profanity filter with context analysis
  const filterResult = checkMessage(message);
  
  if (!filterResult.blocked) {
    // No profanity detected, message is clean
    return {
      allowed: true,
      cleanedMessage: message
    };
  }

  // Step 2: Profanity detected - try AI analysis first (silently)
  try {
    const aiResult = await analyzeMessage(message);
    
    // If AI analysis succeeded (not the fallback "AI analysis failed")
    if (aiResult.explanation !== "AI analysis failed") {
      if (aiResult.intentional_violation === "yes") {
        // AI determined it's intentionally harmful
        return {
          allowed: false,
          cleanedMessage: filterResult.cleaned,
          reason: aiResult.explanation,
          categories: aiResult.categories
        };
      } else {
        // AI determined it's not harmful (casual use, humor, etc.)
        return {
          allowed: true,
          cleanedMessage: message,
          reason: "Profanity detected but not harmful intent"
        };
      }
    }
  } catch (error) {
    // Silently fall through to pattern-based detection
  }

  // Step 3: AI failed or unavailable - use pattern-based detection
  if (filterResult.isHarmful) {
    // Pattern indicates harmful intent - BLOCK
    return {
      allowed: false,
      cleanedMessage: filterResult.cleaned,
      reason: "Message contains harmful language directed at others",
      categories: ["Harassment", "Toxic"]
    };
  } else {
    // Profanity detected but context seems casual/positive - ALLOW with censoring
    return {
      allowed: true,
      cleanedMessage: filterResult.cleaned,
      reason: "Profanity censored (casual usage detected)"
    };
  }
}
