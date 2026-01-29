# CodeShare Quick Start Guide

Mulai gunakan CodeShare dalam 5 menit!

## ⚡ 5 Minute Setup

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account (free tier okay)
- Git (optional)

### 2. Download Project

```bash
# Via GitHub
git clone <repository>
cd codeshare

# Or download ZIP dan extract
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment

Buat file `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Cara mendapat credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project (atau gunakan existing)
3. Go to Settings → API
4. Copy Project URL dan Anon Key
5. Paste ke `.env.local`

### 5. Setup Database

Run migrations (auto-detect Supabase project):

```bash
# Migrations akan auto-run dari scripts folder
# Atau manual: Go to Supabase SQL Editor, copy-paste dari:
# - scripts/001_create_tables.sql
# - scripts/002_profile_trigger.sql
```

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in browser.

**Done! 🎉**

## 🚀 Common Tasks

### Create Account
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Enter email dan password
4. Redirect ke dashboard

### Upload First Snippet
1. Click "Upload" button
2. Fill form:
   - **Title**: "Hello World in JavaScript"
   - **Code**: Paste your code
   - **Language**: JavaScript
   - **Description**: (optional) "My first snippet"
3. Click "Upload Snippet"
4. View di dashboard

### Share Snippet
1. Go to dashboard
2. Click snippet card
3. Toggle "Public" checkbox
4. Copy URL dan share dengan teman!

### Explore Community
1. Click "Explore" di header
2. Search atau filter by language
3. Click snippet untuk view
4. Use Copy/Download buttons

## 🎯 Key Features Walkthrough

### Dashboard
```
- View all your snippets
- Statistics (total, public, private)
- Quick access buttons
- Empty state if no snippets yet
```

### Code Viewer
```
- Switch between Raw/Editor view
- Copy code dengan satu klik
- Download sebagai file
- See metadata (lines, size)
- Edit/Delete jika owner
```

### Explore
```
- Browse public snippets
- Search by title
- Filter by language
- See author info
```

## 🔧 Troubleshooting

### "Cannot GET /dashboard"
- Verify Anda sudah login
- Check browser console untuk errors
- Try logout dan login lagi

### "Environmental variables not found"
- Check `.env.local` file exists
- Verify variable names exact match
- Restart dev server setelah update

### "Database connection failed"
- Check Supabase URL dan key correct
- Verify Supabase project is active
- Check internet connection

### Code tidak muncul di code viewer
- Make sure code length < 1MB
- Try refreshing page
- Check browser console untuk errors

## 📱 Testing Checklist

Sebelum deploy, test ini:

- [ ] Can sign up dengan email baru
- [ ] Can login dengan credentials
- [ ] Can upload snippet dengan berbagai languages
- [ ] Can toggle public/private
- [ ] Can view snippet detail
- [ ] Copy button works
- [ ] Download button works
- [ ] Raw view works
- [ ] Editor view works
- [ ] Can delete snippet
- [ ] Can explore public snippets
- [ ] Can search snippets
- [ ] Can filter by language
- [ ] Responsive di mobile
- [ ] Dark mode works

## 🎨 Customization

### Change Brand Name
```
1. Edit app/layout.tsx (metadata)
2. Edit app/page.tsx (hero section)
3. Edit components/header.tsx (logo)
4. Update README.md
```

### Add New Language
```
1. Edit LANGUAGES array di components/upload-form.tsx
2. Add extension ke getFileExtension() di components/code-viewer.tsx
3. Add mapping ke LANGUAGE_EXTENSIONS di lib/utils/code.ts
```

### Change Color Scheme
```
1. Edit :root colors di app/globals.css
2. Edit .dark colors di app/globals.css
3. Update design tokens
```

### Customize Glass Effect
```
1. Edit .glass classes di app/globals.css
2. Adjust opacity: bg-white/[percentage]
3. Adjust blur: backdrop-blur-[size]
```

## 📚 Learn More

- **Documentation**: See README.md
- **Features**: See FEATURES.md
- **Deployment**: See DEPLOYMENT.md
- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind**: https://tailwindcss.com/docs

## 💡 Pro Tips

1. **Organize Snippets**
   - Use descriptive titles
   - Add good descriptions
   - Keep related snippets together

2. **Optimize Performance**
   - Keep code under 100KB if possible
   - Use syntax highlighting properly
   - Comment your code

3. **Security**
   - Mark private snippets sebagai private
   - Don't share sensitive credentials
   - Review who can see your code

4. **Community**
   - Share useful snippets publicly
   - Write clear descriptions
   - Help others find your code

## 🆘 Getting Help

**Stuck?** Check ini:

1. **Read Errors**
   - Browser console (F12)
   - Terminal output
   - Supabase logs

2. **Check Docs**
   - README.md
   - FEATURES.md
   - DEPLOYMENT.md

3. **Verify Setup**
   - .env.local correct?
   - Dependencies installed?
   - Database migrations done?
   - Dev server running?

4. **Reset Everything**
   ```bash
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

## 🎊 Next Steps

After you're comfortable:

1. **Customize** - Make it your own
2. **Deploy** - Follow DEPLOYMENT.md
3. **Invite Friends** - Share dengan community
4. **Contribute** - Add features!

---

**Happy coding! 🚀**

Need more help? Open an issue or check the documentation files.
