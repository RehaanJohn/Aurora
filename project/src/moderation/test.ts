import { moderateMessage } from "./index";

/**
 * Test suite for the AI moderation system
 * Run this file to test different message scenarios
 */

const testMessages = [
  // Should PASS - Casual/Enthusiastic
  { text: "This movie is fucking amazing!", expectedResult: "PASS" },
  { text: "Holy shit, did you see that play?", expectedResult: "PASS" },
  { text: "The game is damn good", expectedResult: "PASS" },
  { text: "I can't believe this shit works!", expectedResult: "PASS" },
  
  // Should BLOCK - Harassment/Toxic
  { text: "You're fucking useless", expectedResult: "BLOCK" },
  { text: "I hate you so much, you piece of shit", expectedResult: "BLOCK" },
  { text: "Kill yourself", expectedResult: "BLOCK" },
  { text: "You're such a worthless bitch", expectedResult: "BLOCK" },
  
  // Should PASS - Clean messages
  { text: "Hello, how are you?", expectedResult: "PASS" },
  { text: "Great job on the project!", expectedResult: "PASS" },
  { text: "Can someone help me with this?", expectedResult: "PASS" },
];

async function runTests() {
  console.log("🧪 Running AI Moderation Tests...\n");
  
  let passed = 0;
  let failed = 0;
  
  for (const test of testMessages) {
    console.log(`\n📝 Testing: "${test.text}"`);
    console.log(`Expected: ${test.expectedResult}`);
    
    try {
      const result = await moderateMessage(test.text);
      const actualResult = result.allowed ? "PASS" : "BLOCK";
      
      console.log(`Result: ${actualResult}`);
      console.log(`Reason: ${result.reason || "Clean message"}`);
      if (result.categories && result.categories.length > 0) {
        console.log(`Categories: ${result.categories.join(", ")}`);
      }
      
      if (actualResult === test.expectedResult) {
        console.log("✅ Test PASSED");
        passed++;
      } else {
        console.log("❌ Test FAILED");
        failed++;
      }
    } catch (error) {
      console.log("❌ Test ERROR:", error);
      failed++;
    }
  }
  
  console.log("\n" + "=".repeat(50));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  console.log(`Success rate: ${((passed / testMessages.length) * 100).toFixed(1)}%\n`);
}

// Uncomment to run tests
// runTests();

export { runTests };
