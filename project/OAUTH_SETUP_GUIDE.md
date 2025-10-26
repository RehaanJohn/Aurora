# Google OAuth Setup Guide for Daccord

## Current Issue: redirect_uri_mismatch

The "Error 400: redirect_uri_mismatch" happens because the redirect URI configured in Google OAuth doesn't match what Supabase is sending.

---

## Solution: 3-Step Configuration

### Step 1: Configure Supabase URLs

1. **Go to Supabase Dashboard:**

   - URL: https://app.supabase.com/project/pewraeoktefueuqcznsw/auth/url-configuration

2. **Navigate to:** `Authentication → URL Configuration`

3. **Site URL:** Set to your main URL

   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com` (when deployed)

4. **Redirect URLs:** Add these (one per line):
   ```
   http://localhost:5173/
   http://localhost:5173
   https://yourdomain.com/
   ```

---

### Step 2: Enable Google OAuth in Supabase

1. **Go to:** `Authentication → Providers`

   - URL: https://app.supabase.com/project/pewraeoktefueuqcznsw/auth/providers

2. **Find Google provider** and enable it

3. **You'll need Google OAuth credentials** (see Step 3)

---

### Step 3: Configure Google Cloud Console

#### A. Create/Access Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** (required for OAuth)

#### B. Create OAuth 2.0 Credentials

1. Navigate to: **APIs & Services → Credentials**
2. Click **+ CREATE CREDENTIALS → OAuth 2.0 Client ID**
3. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: Daccord
   - User support email: Your email
   - Developer contact: Your email

#### C. Configure OAuth Client ID

**Application type:** Web application

**Authorized JavaScript origins:**

```
http://localhost:5173
https://yourdomain.com
```

**Authorized redirect URIs** (CRITICAL - must match exactly):

```
https://pewraeoktefueuqcznsw.supabase.co/auth/v1/callback
```

> ⚠️ **Important:** The redirect URI MUST be your Supabase project URL + `/auth/v1/callback`

4. Click **CREATE**
5. **Copy the Client ID and Client Secret**

#### D. Add Credentials to Supabase

1. Go back to Supabase: `Authentication → Providers → Google`
2. Paste:
   - **Client ID** (from Google)
   - **Client Secret** (from Google)
3. Click **Save**

---

## Step 4: Test the Setup

1. **Clear browser cache/cookies** (important!)
2. **Restart your dev server:**
   ```powershell
   npm run dev
   ```
3. Click "Sign In" button in your app
4. Click "Continue with Google"
5. You should see Google's consent screen
6. After approval, you'll be redirected back to your app

---

## Troubleshooting

### Still getting redirect_uri_mismatch?

**Double-check these exact matches:**

- Supabase callback URL in Google Console: `https://pewraeoktefueuqcznsw.supabase.co/auth/v1/callback`
- No extra spaces, no trailing slashes on the callback
- Protocol is `https://` not `http://`

### OAuth works but user not persisted?

Check browser console for errors. The AuthContext should automatically handle session persistence.

### Testing locally vs production

- **Local:** Use `http://localhost:5173`
- **Production:** Add your production domain to BOTH Supabase and Google Console

---

## Current Configuration in Code

Your app is configured in `src/contexts/AuthContext.tsx`:

```typescript
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  ...
};
```

This will redirect users back to the homepage after authentication.

---

## Security Notes

1. **Never commit** Google OAuth credentials to git
2. Keep your `VITE_SUPABASE_ANON_KEY` public (it's safe)
3. The `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed (we're not using it)
4. In production, enable Row Level Security (RLS) on Supabase tables

---

## Next Steps After OAuth Works

1. ✅ Test sign in flow
2. ✅ Verify user data appears in Supabase Dashboard → Authentication → Users
3. 🔄 Wire up user menu actions (Settings, Profile, etc.)
4. 🔄 Add protected routes
5. 🔄 Implement user profiles and preferences

---

## Quick Reference: Your Supabase Details

- **Project URL:** https://pewraeoktefueuqcznsw.supabase.co
- **Project Ref:** pewraeoktefueuqcznsw
- **Callback URL:** https://pewraeoktefueuqcznsw.supabase.co/auth/v1/callback

---

Need help? Check:

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
