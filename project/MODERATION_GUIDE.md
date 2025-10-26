# AI Moderation System - Visual Guide

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Types Message                        │
│                  "This is f*cking awesome!"                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 1: Basic Profanity Filter                  │
│                   (filter.ts - Instant)                      │
│                                                              │
│  • Scans for known profanity words                          │
│  • Creates cleaned version: "This is ******* awesome!"      │
│  • Returns: blocked=true, detected=["fucking"]              │
└───────────────────────┬─────────────────────────────────────┘
                        │
              ┌─────────┴──────────┐
              │                    │
         NO PROFANITY         PROFANITY FOUND
              │                    │
              ▼                    ▼
      ┌──────────────┐   ┌──────────────────────────┐
      │ Allow & Send │   │  STEP 2: AI Analysis     │
      │   Directly   │   │  (aiAgent.ts - ~1 sec)   │
      └──────────────┘   │                          │
                         │  Google Gemini 1.5 Flash │
                         │  analyzes context:       │
                         │                          │
                         │  • Intent (hostile?)     │
                         │  • Context (humor?)      │
                         │  • Target (person?)      │
                         │  • Tone (angry?)         │
                         └────────┬─────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              HARMFUL INTENT              NOT HARMFUL
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │  BLOCK MESSAGE   │        │  ALLOW MESSAGE   │
          │                  │        │                  │
          │  Show warning:   │        │  Send original   │
          │  "⚠️ Blocked:    │        │  or cleaned msg  │
          │   Harassment"    │        │                  │
          └──────────────────┘        └──────────────────┘
```

## 🎯 Example Scenarios

### Scenario 1: Clean Message ✅

```
Input: "Hello, how are you today?"
       ↓
Profanity Filter: ✅ Clean
       ↓
Result: ALLOW (no AI needed)
```

### Scenario 2: Casual Profanity ✅

```
Input: "This game is fucking amazing!"
       ↓
Profanity Filter: ⚠️ Found "fucking"
       ↓
AI Analysis:
  - Intent: Enthusiastic
  - Context: Positive statement about game
  - Tone: Excited, not hostile
  - Target: None (talking about game)
       ↓
Decision: NOT HARMFUL
       ↓
Result: ALLOW with message "Profanity detected but not harmful intent"
```

### Scenario 3: Harassment ❌

```
Input: "You're fucking useless"
       ↓
Profanity Filter: ⚠️ Found "fucking"
       ↓
AI Analysis:
  - Intent: Insulting
  - Context: Personal attack
  - Tone: Hostile
  - Target: Direct person attack
       ↓
Decision: HARMFUL
       ↓
Result: BLOCK
Reason: "Direct personal insult with hostile intent"
Categories: ["Harassment", "Toxic"]
```

### Scenario 4: Threat ❌

```
Input: "I'm going to kill you"
       ↓
Profanity Filter: ✅ Clean (no profanity)
       ↓
AI Analysis: (runs anyway for threats)
  - Intent: Threatening
  - Context: Violence implied
  - Tone: Dangerous
  - Target: Person
       ↓
Decision: HARMFUL
       ↓
Result: BLOCK
Categories: ["Dangerous", "Harassment"]
```

## 🔄 Message Flow in Chat Component

```typescript
// 1. User clicks Send
handleSendMessage() {

  // 2. Run moderation
  const result = await moderateMessage(messageInput)

  // 3. Check decision
  if (!result.allowed) {
    // Show warning banner
    setModerationWarning("⚠️ Message blocked: ...")
    return
  }

  // 4. Message approved - add to chat
  setMessages([...messages, newMessage])

  // 5. Clear input
  setMessageInput("")
}
```

## 📊 Decision Matrix

| Message Type        | Profanity? | AI Decision | Result   |
| ------------------- | ---------- | ----------- | -------- |
| "Hello friend"      | ❌         | N/A         | ✅ Allow |
| "F\*ck yeah!"       | ✅         | Not harmful | ✅ Allow |
| "You're an idiot"   | ❌         | Harmful     | ❌ Block |
| "I hate you"        | ❌         | Harmful     | ❌ Block |
| "This sh\*t works!" | ✅         | Not harmful | ✅ Allow |
| "Kill yourself"     | ❌         | Dangerous   | ❌ Block |

## 🎨 UI States

### 1. Normal State

```
┌────────────────────────────────────┐
│ Message #general                   │
└────────────────────────────────────┘
[Send]
```

### 2. Checking State (AI analyzing)

```
┌────────────────────────────────────┐
│ Message #general                   │
└────────────────────────────────────┘
[Send] Checking...
```

### 3. Blocked State

```
┌─────────────────────────────────────────────┐
│ ⚠️ Message blocked: Harassment, Toxic       │
│ Direct personal insult with hostile intent  │
└─────────────────────────────────────────────┘
┌────────────────────────────────────┐
│ Message #general                   │
└────────────────────────────────────┘
[Send]
```

### 4. Info State (profanity cleaned)

```
┌─────────────────────────────────────────────┐
│ ℹ️ Profanity detected but not harmful       │
└─────────────────────────────────────────────┘
┌────────────────────────────────────┐
│ Message #general                   │
└────────────────────────────────────┘
[Send]
```

## ⚙️ Configuration Files

### .env

```env
VITE_GEMINI_API_KEY=your_key_here
```

### aiAgent.ts

- Google Gemini integration
- Context analysis logic
- JSON response parsing

### filter.ts

- Profanity word list
- Basic pattern matching
- Message cleaning

### index.ts

- Combines both systems
- Decision logic
- Error handling

## 🔐 Privacy & Security

- ✅ Messages analyzed in real-time (not stored)
- ✅ AI runs on Google's secure servers
- ✅ No message history kept by moderation system
- ✅ Each message analyzed independently
- ✅ User sees reason for blocked messages

## 📈 Performance

| Operation           | Time | Notes                     |
| ------------------- | ---- | ------------------------- |
| Profanity Filter    | <1ms | Instant regex check       |
| AI Analysis         | ~1s  | Only when profanity found |
| Total (clean msg)   | <1ms | No AI needed              |
| Total (profane msg) | ~1s  | Includes AI analysis      |

## 🎯 Success Metrics

The system should:

- ✅ Block 100% of direct harassment
- ✅ Block 100% of threats
- ✅ Allow 90%+ of casual profanity in positive context
- ✅ Provide clear explanations for blocks
- ✅ Have <2s latency for AI decisions
