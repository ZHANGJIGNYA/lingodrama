# 🤖 AI API Configuration Guide

LingoDrama uses **two AI providers** with automatic fallback:
1. **Claude API** (Anthropic) - Primary provider, highest quality
2. **Gemini API** (Google) - Backup provider, generous free tier

The app automatically tries Claude first, and falls back to Gemini if Claude is unavailable.

---

## 🔑 Get API Keys

### Option 1: Claude API (Anthropic) - Recommended

**Get your key:**
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-`)

**Pricing:**
- Claude 3.5 Sonnet: $3/MTok input, $15/MTok output
- Claude 3.5 Haiku: $1/MTok input, $5/MTok output
- **Free trial**: $5 credit (~250 stories)
- Each story: ~$0.01-0.02

### Option 2: Gemini API (Google) - Free Alternative

**Get your key:**
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Get API Key" → "Create API key"
4. Select or create a Google Cloud project
5. Copy your API key (starts with `AIza`)

**Pricing:**
- Gemini 2.0 Flash: **FREE** up to 1500 requests/day
- Gemini 1.5 Flash: **FREE** up to 1500 requests/day
- Gemini 1.5 Pro: **FREE** up to 50 requests/day
- No credit card required!

---

## ⚙️ Configuration

1. **Open `.env.local`** in your project root

2. **Add both API keys** (or at least one):

```env
# Claude API (Primary - Best Quality)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Gemini API (Backup - Free Tier)
GEMINI_API_KEY=AIzaxxxxxxxxxxxxx
```

3. **Restart your server**:

```bash
npm run dev
```

---

## 🔄 Fallback Strategy

The app tries multiple models in order:

```
1. Claude 3.5 Sonnet ⭐⭐⭐⭐⭐
   ↓ (if overloaded)
2. Claude 3.5 Haiku ⭐⭐⭐⭐
   ↓ (if overloaded)
3. Claude 3 Haiku ⭐⭐⭐⭐
   ↓ (if all Claude fails)
4. Gemini 2.0 Flash Exp ⭐⭐⭐⭐
   ↓ (if overloaded)
5. Gemini 1.5 Flash ⭐⭐⭐⭐
   ↓ (if overloaded)
6. Gemini 1.5 Pro ⭐⭐⭐⭐⭐
   ↓ (if all AI fails)
7. Demo Story (Mock Data)
```

**Recommended Setup:**
- Add **both keys** for maximum reliability
- Gemini is completely free (1500 stories/day)
- Claude produces slightly better stories but costs money

---

## 🧪 Testing

1. **Add words** at http://localhost:3000/vault
   - Example: `elastic, cynical, compatible`

2. **Generate story** at http://localhost:3000/review
   - Click "Start Theater"

3. **Check console** (F12 → Console):

```bash
🎯 Strategy 1: Trying Claude API...
🤖 Trying Claude model: claude-3-5-sonnet-20241022
✅ Script generated successfully with Claude
```

Or if Claude fails:

```bash
🎯 Strategy 1: Trying Claude API...
❌ Claude failed: overload_error
⚠️ Switching to Gemini...
🎯 Strategy 2: Trying Gemini API...
🤖 Trying Gemini model: gemini-2.0-flash-exp
✅ Script generated successfully with Gemini
```

---

## 🐛 Troubleshooting

### ❌ "Invalid API key"

**Solution:**
- Verify key in `.env.local` is correct
- Claude keys start with `sk-ant-`
- Gemini keys start with `AIza`
- No extra spaces or quotes

### ❌ "All AI providers failed"

**Solution:**
1. Check if you have at least one valid API key
2. Verify internet connection
3. Wait a few minutes (APIs might be overloaded)
4. App will use demo stories as fallback

### ❌ "Quota exceeded" (Gemini)

**Solution:**
- Wait 24 hours for quota reset (1500 req/day free)
- Add Claude API key as backup

### ⚠️ Environment variables not loading

**Solution:**
1. Restart server: `npm run dev`
2. Check `.env.local` is in project root
3. File must be named exactly `.env.local`

---

## 📊 API Comparison

| Feature | Claude | Gemini |
|---------|--------|--------|
| **Story Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Speed** | Medium | Fast |
| **Free Tier** | $5 credit | 1500 req/day |
| **Cost** | $0.01-0.02/story | FREE |
| **Best For** | Best quality | High volume |

---

## ✅ Success!

Once configured, the app will:
- ✨ Generate personalized stories from your vocabulary
- 🧠 Use Ebbinghaus forgetting curve for optimal review
- 🔄 Automatically fallback between providers
- 📊 Update spaced repetition after each review

**Enjoy AI-powered English learning!** 🎉

---

**Need help?**
- Claude: https://docs.anthropic.com/
- Gemini: https://ai.google.dev/gemini-api/docs
