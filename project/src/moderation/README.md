# AI-Powered Moderation System

This moderation system uses Google Gemini AI to provide context-aware content moderation that goes beyond simple profanity filtering.

## How It Works

The system uses a two-step approach:

1. **Basic Profanity Filter** (`filter.ts`)

   - Quickly scans messages for common profanity
   - Returns cleaned version of the message
   - Low latency, runs instantly

2. **AI Context Analysis** (`aiAgent.ts`)

   - Only activated when profanity is detected
   - Uses Google Gemini 1.5 Flash to analyze intent and context
   - Determines if the message is intentionally harmful or just casual language
   - Returns decision with explanation and categories

3. **Combined Decision** (`index.ts`)
   - Combines both systems for smart moderation
   - Blocks only intentionally harmful content
   - Allows casual profanity, humor, and quotes

## Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev)
2. Sign in with your Google account
3. Click "Get API key"
4. Copy your API key

### 2. Configure Environment

Add your API key to `.env`:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Test the System

Try these example messages in the chat:

**Should PASS:**

- "This movie is f\*cking amazing!" ✅ (enthusiasm)
- "Holy shit, did you see that play?" ✅ (excitement)
- "The game is damn good" ✅ (casual language)

**Should BLOCK:**

- "You're f\*cking useless" ❌ (harassment)
- "I hate all [discriminatory term]" ❌ (hate speech)
- Messages with threats or toxic intent ❌

## Architecture

```
Message Input
    ↓
┌─────────────────────┐
│ Profanity Filter    │ → No profanity? → Allow
│ (filter.ts)         │
└─────────────────────┘
         ↓
    Profanity found
         ↓
┌─────────────────────┐
│ AI Context Analysis │ → Intent harmful? → Block
│ (aiAgent.ts)        │ → Intent okay? → Allow
└─────────────────────┘
         ↓
┌─────────────────────┐
│ Final Decision      │
│ (index.ts)          │
└─────────────────────┘
```

## Features

- ✅ Context-aware moderation
- ✅ Distinguishes between harmful and casual language
- ✅ Provides explanations for blocked messages
- ✅ Categories harmful content (Hate, Harassment, Toxic, etc.)
- ✅ Low latency (AI only runs when needed)
- ✅ Graceful fallback if AI is unavailable
- ✅ Real-time feedback to users

## Customization

### Modify Profanity List

Edit `filter.ts` to add/remove words from the profanity list:

```typescript
const profanityList = [
  // Add your custom words here
];
```

### Adjust AI Prompt

Edit `aiAgent.ts` to change how the AI evaluates messages:

```typescript
const prompt = `
  // Customize the AI's instructions here
`;
```

### Change Categories

Modify the categories in `aiAgent.ts`:

```typescript
"categories": ["Hate","Harassment","Toxic","Sexual","Profanity","Dangerous"]
```

## API Usage

The system uses Google Gemini 1.5 Flash (free tier):

- Fast responses (typically < 1 second)
- Free quota: Generous limits for personal projects
- See [Gemini API pricing](https://ai.google.dev/pricing) for details

## Troubleshooting

### "AI moderation failed"

- Check your API key is correct in `.env`
- Ensure you have internet connection
- Verify your Gemini API quota hasn't been exceeded

### Messages being blocked incorrectly

- The AI learns from context - try rephrasing
- Check the explanation to understand why it was blocked
- Adjust the prompt in `aiAgent.ts` if needed

### Messages not being moderated

- Ensure the `.env` file is in the project root
- Restart your dev server after adding the API key
- Check browser console for errors

## Privacy & Safety

- Messages are sent to Google Gemini for analysis
- No message history is stored by the moderation system
- Each message is analyzed independently
- Follow Google's [AI usage policies](https://policies.google.com/terms/generative-ai)
