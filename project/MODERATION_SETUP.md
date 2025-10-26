# 🚀 Quick Start Guide - AI Moderation System

## ✅ Installation Complete!

The AI-powered moderation system has been successfully integrated into your Aurora chat application.

## 📋 Next Steps

### 1. Get Your Free Gemini API Key

1. Visit **https://ai.google.dev**
2. Sign in with your Google account
3. Click **"Get API key"** in AI Studio
4. Copy your API key

### 2. Add API Key to Environment

Open `.env` file in your project root and replace the placeholder:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Restart Your Dev Server

```bash
npm run dev
```

## 🎯 How to Test

1. **Open your chat in a server**
2. **Try these test messages:**

### Messages that SHOULD PASS ✅

- "This is fucking awesome!" (enthusiasm)
- "Holy shit, that was amazing!" (excitement)
- "The game is damn good" (casual language)

### Messages that SHOULD BLOCK ❌

- "You're fucking useless" (harassment)
- "I hate you, you piece of shit" (toxic)
- Any threats or discriminatory language

## 📁 What Was Added

```
project/src/moderation/
├── aiAgent.ts      - Google Gemini AI integration
├── filter.ts       - Basic profanity detection
├── index.ts        - Combined moderation logic
├── test.ts         - Test suite
└── README.md       - Full documentation
```

## 🎨 Chat Integration

The moderation system is now active in your Chat component:

- **Real-time checking** - Messages analyzed before sending
- **Visual feedback** - Warning alerts for blocked messages
- **Smart filtering** - Context-aware decisions
- **Loading states** - Shows "Checking..." while analyzing

## ⚙️ How It Works

```
User sends message
       ↓
Profanity filter checks for bad words
       ↓
If found → AI analyzes intent and context
       ↓
Decision: Allow or Block with explanation
```

## 🔧 Customization

### Modify Profanity List

Edit `src/moderation/filter.ts` to add/remove words

### Adjust AI Behavior

Edit the prompt in `src/moderation/aiAgent.ts`

### Change Warning Display

Customize the UI in `src/screens/Chat/Chat.tsx`

## ⚡ API Information

- **Model**: Gemini 1.5 Flash (fast & free)
- **Latency**: Typically < 1 second
- **Free Tier**: Generous limits for development
- **Docs**: https://ai.google.dev/gemini-api/docs

## 🐛 Troubleshooting

### "AI moderation failed"

- ✅ Check API key in `.env`
- ✅ Restart dev server
- ✅ Verify internet connection

### Messages blocked incorrectly

- The AI learns from context
- Check the explanation message
- Adjust prompt if needed

### API key not working

- Make sure it's prefixed with `VITE_`
- No quotes needed in `.env` file
- Must restart dev server after adding

## 📚 Documentation

Full documentation available in:

- `src/moderation/README.md` - Complete technical docs
- `src/moderation/test.ts` - Test examples

## 🎉 You're All Set!

Just add your Gemini API key and you're ready to go!

Questions? Check the README.md or the official Gemini docs.
