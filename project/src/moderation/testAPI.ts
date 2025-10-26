// Quick test to verify Gemini API is working
// Open browser console and run this to test your API key

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyApOtNhPHbC-LhzmjrtLnQIoEQUqBaPw_c";

async function testGeminiAPI() {
  console.log("Testing Gemini API...");
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  // Try different model names
  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest", 
    "gemini-1.5-pro",
    "gemini-pro",
    "models/gemini-1.5-flash",
    "models/gemini-pro"
  ];
  
  for (const modelName of modelNames) {
    try {
      console.log(`\n🧪 Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello");
      const text = result.response.text();
      console.log(`✅ SUCCESS with ${modelName}:`, text);
      return modelName; // Return first working model
    } catch (error: any) {
      console.log(`❌ Failed with ${modelName}:`, error.message);
    }
  }
  
  console.log("\n❌ No working model found. Check your API key.");
  return null;
}

// Export for testing
export { testGeminiAPI };

// Uncomment to run immediately:
// testGeminiAPI().then(model => console.log("Working model:", model));
