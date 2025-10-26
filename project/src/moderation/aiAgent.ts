export interface ModerationResult {
  intentional_violation: "yes" | "no";
  explanation: string;
  categories: string[];
}

/**
 * Analyze a message to determine if the offensive word was intentional.
 * Returns a decision based on context rather than just the term used.
 * Using direct REST API call for better compatibility.
 */
/**
 * Analyze a message to determine if the offensive word was intentional.
 * Returns a decision based on context rather than just the term used.
 * Using direct REST API call for better compatibility.
 */
export async function analyzeMessage(message: string): Promise<ModerationResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  if (!apiKey) {
    return {
      intentional_violation: "no",
      categories: [],
      explanation: "AI analysis failed"
    };
  }
  
  const prompt = `You are a content moderation AI agent.

Decide whether the message is intentionally offensive or harmful based on the user's intent and context — not just the presence of bad words.

Output ONLY a valid JSON object with this exact structure:
{
  "intentional_violation": "yes",
  "explanation": "This is a direct personal attack using hostile language to demean someone.",
  "categories": ["Harassment", "Toxic"]
}

Rules:
- Mark "yes" only if the message shows hostility, discrimination, or intent to harm
- Ignore casual profanity, enthusiasm, humor, or quotes
- Categories can include: Hate, Harassment, Toxic, Sexual, Profanity, Dangerous

Message to analyze: "${message}"

Respond with ONLY the JSON object, no additional text:`;

  try {
    // Use gemini-pro which is universally available in v1 API
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      // Silently fail - don't log errors, just return fallback
      return {
        intentional_violation: "no",
        categories: [],
        explanation: "AI analysis failed"
      };
    }

    const data = await response.json();
    
    // Extract text from Gemini response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    }
    
    return {
      intentional_violation: "no",
      categories: [],
      explanation: "AI analysis failed"
    };
  } catch (error) {
    // Silently fail - pattern-based detection will handle it
    return {
      intentional_violation: "no",
      categories: [],
      explanation: "AI analysis failed"
    };
  }
}
