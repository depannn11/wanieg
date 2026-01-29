# CodeShare - Platform Berbagi Kode

Platform modern untuk upload, kelola, dan berbagi code snippets dengan mudah. Dibangun dengan Next.js 16, Supabase, dan Tailwind CSS dengan design glass morphism yang elegan.

## ✨ Fitur Utama

### Autentikasi & User Management
- ✅ Sign up dan login dengan email/password
- ✅ Session management yang aman
- ✅ Profile management
- ✅ Protected routes

### Code Snippet Management
- ✅ Upload snippets dengan 17+ bahasa pemrograman
- ✅ Syntax highlighting untuk setiap bahasa
- ✅ Private dan public snippets
- ✅ Full CRUD operations (Create, Read, Update, Delete)

### Code Viewer
- ✅ **Raw View** - lihat kode dengan formatting plain text
- ✅ **Editor View** - lihat dengan syntax highlighting
- ✅ **Copy to Clipboard** - copy seluruh kode dengan satu klik
- ✅ **Download File** - download snippet sebagai file
- ✅ Info metadata (lines, file size, language)

### Explore & Discovery
- ✅ Browse public snippets dari komunitas
- ✅ Search snippets berdasarkan judul
- ✅ Filter berdasarkan bahasa pemrograman
- ✅ Lihat snippet dari user lain

### Design & UX
- ✅ **Glass Morphism** - design modern dengan glass effect
- ✅ **Responsive Mobile-First** - sempurna di semua device
- ✅ **Smooth Animations** - transitions yang mulus
- ✅ **Dark Mode Support** - dark dan light theme
- ✅ **Accessible** - semantic HTML dan ARIA attributes

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS
- **Lucide React** - Icon library
- **ShadcnUI** - High-quality UI components
- **date-fns** - Date formatting

### Backend & Database
- **Supabase** - PostgreSQL + Auth managed
- **Row Level Security (RLS)** - Data protection
- **Migrations** - Version-controlled schema

### Performance & Security
- **Server Components** - Zero JS bloat
- **Server Actions** - Form submission tanpa API routes
- **Password Hashing** - Via Supabase Auth
- **CORS Protection** - Secure requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase project
- Git

### Installation

1. **Clone dan setup**
```bash
git clone <repository>
cd codeshare
npm install
```

2. **Setup Environment Variables**

Buat file `.env.local` dengan:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

3. **Run database migrations**
```bash
npm run db:migrate
```

4. **Start development server**
```bash
npm run dev
```

Buka http://localhost:3000 di browser Anda.

## 📱 Supported Languages

JavaScript, TypeScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, HTML, CSS, SQL, Bash, JSON, XML, YAML

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── login/
│   ├── sign-up/
│   └── logout/
├── dashboard/          # User snippets dashboard
├── upload/            # Create new snippet
├── snippets/
│   └── [id]/          # View snippet details
├── explore/           # Browse public snippets
├── profile/           # User profile
└── page.tsx           # Homepage

components/
├── upload-form.tsx    # Snippet upload form
├── code-viewer.tsx    # Code display with features
├── snippet-card.tsx   # Snippet preview card
├── header.tsx         # Navigation header
└── ui/                # ShadcnUI components

lib/
├── supabase/
│   ├── client.ts      # Client-side Supabase
│   ├── server.ts      # Server-side Supabase
│   └── proxy.ts       # Auth proxy

scripts/
├── 001_create_tables.sql    # Main schema
└── 002_profile_trigger.sql  # Auto-create profiles
```

## 🔐 Database Schema

### profiles
- `id` (UUID) - User ID (FK to auth.users)
- `username` (text)
- `created_at` (timestamp)

### snippets
- `id` (UUID) - Primary key
- `user_id` (UUID) - FK to profiles
- `title` (text) - Snippet title
- `description` (text)
- `code` (text) - Actual code
- `language` (text) - Programming language
- `is_public` (boolean) - Public/Private
- `created_at` (timestamp)

### Row Level Security (RLS)
- Users dapat hanya melihat public snippets atau snippet mereka sendiri
- Users dapat hanya edit/delete snippet milik mereka
- Policies terotomasi via auth.uid()

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Blue (accent actions)
- **Background**: Light neutral untuk light mode, dark untuk dark mode
- **Glass**: White with 10-20% opacity + backdrop blur

### Glass Morphism Classes
```tsx
.glass         // Base glass effect
.glass-lg      // Larger with rounded corners
.glass-input   // For form inputs
.smooth-fade   // Smooth transitions
```

## 🔄 Key Features Deep Dive

### Upload Snippet
```
1. User login → /upload
2. Fill form (title, description, code, language, public/private)
3. Submit → Server action
4. Insert ke database via RLS
5. Redirect ke dashboard
```

### View Snippet
```
1. Browse snippets
2. Click card → /snippets/[id]
3. View code dengan 3 modes:
   - Formatted view (default)
   - Raw view (plain text)
   - Copy/Download buttons
```

### Search & Filter
```
1. Go to /explore
2. Search by title atau filter by language
3. Browse public snippets dari komunitas
```

## 📊 API Routes

### Server Actions (app/actions/snippets.ts)
- `uploadSnippet()` - Create new snippet
- `getSnippets()` - Fetch paginated snippets
- `getSnippetById()` - Get single snippet
- `deleteSnippet()` - Delete snippet
- `updateSnippet()` - Update snippet metadata

### Route Handlers
- `POST /api/snippets/[id]/delete` - Delete endpoint
- `POST /auth/logout` - Logout endpoint

## 🚀 Deployment

### Deploy ke Vercel
```bash
git push             # Push ke GitHub
# Automatically deployed ke Vercel
```

### Environment Variables di Production
Set di Vercel Project Settings:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 📝 Development Tips

### Add New Language
Edit `LANGUAGES` array di components/upload-form.tsx dan update `getFileExtension` di components/code-viewer.tsx

### Customize Glass Effect
Edit `.glass` classes di app/globals.css dengan:
- `bg-white/[opacity]` - Opacity level
- `backdrop-blur-[size]` - Blur amount
- `border-white/[opacity]` - Border opacity

### Database Queries
Gunakan `createClient()` dari `/lib/supabase/server` di Server Components:
```tsx
const supabase = await createClient()
const { data } = await supabase.from('snippets').select()
```

## 🐛 Troubleshooting

### Tidak bisa login?
- Cek environment variables sudah set
- Verify Supabase project connected
- Check browser console untuk error messages

### Snippets tidak muncul?
- Verify RLS policies enabled
- Check user authenticated
- Look at Supabase logs

### Glass effect tidak terlihat?
- Browser harus support backdrop-filter (modern browsers)
- Check dark mode setting
- Verify globals.css loaded

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📞 Support

Punya pertanyaan? Buka issue atau contact melalui GitHub.

---

**Made with ❤️**
