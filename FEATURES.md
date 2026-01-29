# CodeShare Features Overview

Dokumentasi lengkap semua fitur yang tersedia di CodeShare.

## 🏠 Homepage

**Path**: `/`

- Modern landing page dengan hero section
- Feature showcase (3 main features)
- Popular public snippets grid
- CTA sections untuk login/signup
- Responsive design sempurna di semua device

**Features**:
- Sticky navigation header
- Popular snippets dari komunitas
- Quick access buttons
- Statistics placeholder

## 🔐 Authentication

### Login
**Path**: `/auth/login`

- Email dan password authentication
- Glass morphism design
- Error handling
- Redirect ke dashboard after login
- Link ke signup page

### Sign Up
**Path**: `/auth/sign-up`

- Create new account dengan email/password
- Confirm password validation
- Glass morphism design
- Error handling
- Automatic profile creation via trigger
- Redirect ke dashboard after signup

### Logout
**Route**: `POST /auth/logout`

- Secure server action
- Redirect ke login page
- Clear session

## 📊 Dashboard

**Path**: `/dashboard`

- Welcome message dengan user email
- Statistics cards (total, public, private snippets)
- Snippets grid dengan filtering/sorting
- Quick actions (upload, explore, profile)
- Empty state dengan CTA

**Features**:
- User's own snippets hanya
- Status indicators (public/private)
- Creation date
- Preview card dengan language tag
- Pagination (optional)

## ⬆️ Upload Snippet

**Path**: `/upload`

- Form untuk create new snippet
- Fields:
  - Title (required)
  - Description (optional)
  - Code (required, multiline textarea)
  - Language dropdown (17+ languages)
  - Public/Private toggle
- Validation
- Error handling
- Success message dan redirect

**Supported Languages**:
- JavaScript, TypeScript
- Python, Java
- C++, C#
- PHP, Ruby
- Go, Rust
- HTML, CSS
- SQL, Bash
- JSON, XML
- YAML

## 👁️ View Snippet

**Path**: `/snippets/[id]`

- Full snippet display dengan:
  - Title, description
  - Author (username)
  - Creation date (relative)
  - Language tag
  - Public/Private status
  
**Features**:
- **Raw View** - Plain text display
- **Editor View** - Formatted code view
- **Copy to Clipboard** - Copy semua kode
- **Download** - Download sebagai file dengan extension sesuai language
- **Metadata** - Lines count dan file size
- **Owner Actions** - Edit/Delete buttons (hanya untuk owner)

**Code Viewer Features**:
- Language-specific file extension
- Syntax highlighting
- Scrollable area untuk long code
- Copy feedback ("Copied!" message)
- File info (lines, size)
- Toggle between views

## 🔍 Explore

**Path**: `/explore`

- Browse semua public snippets
- **Search** - Cari berdasarkan title
- **Filter** - By programming language
- **Results** - Grid display dengan snippet cards
- **Empty State** - Message ketika tidak ada results

**Features**:
- Real-time search (server-side)
- Language filter pills
- Pagination untuk results
- Sort by creation date (newest first)

## 👤 Profile

**Path**: `/profile`

- User profile information:
  - Email address
  - Username
  - Join date (relative)
  - Avatar placeholder
  
- **Statistics**:
  - Total snippets count
  - Public snippets count
  
- **Account Actions**:
  - Sign out button
  - Placeholder untuk future settings

## 🎨 Design System

### Glass Morphism
```css
.glass {
  background: white/10 with backdrop blur
  border: white/20
  rounded corners
  smooth transitions
}
```

### Color Palette
- **Light Mode**:
  - Background: Off-white (#f7f7f7)
  - Foreground: Dark (#1a1a1a)
  - Primary: Purple/Blue (#6366f1)
  - Border: Light gray

- **Dark Mode**:
  - Background: Very dark (#0f0f0f)
  - Foreground: Off-white (#f5f5f5)
  - Primary: Bright purple (#a78bfa)
  - Border: Dark gray

### Typography
- Headings: Geist (sans-serif)
- Body: Geist (sans-serif)
- Code: Geist Mono (monospace)
- Font sizes: 12px - 48px

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Components
- Buttons (primary, outline, ghost, destructive)
- Cards dengan glass effect
- Input fields dengan glass styling
- Dropdowns dengan glass styling
- Modals (via dialog component)

## 🔒 Security Features

### Authentication
- Supabase Auth dengan email/password
- Secure session management
- HTTP-only cookies
- Password hashing (bcrypt via Supabase)

### Authorization
- Row Level Security (RLS) on all tables
- Users can hanya:
  - View public snippets
  - View own snippets
  - Edit own snippets
  - Delete own snippets

### Data Protection
- User data isolated per user_id
- Policies prevent unauthorized access
- Server-side validation
- Input sanitization

## 📱 Responsive Design

### Breakpoints
- Mobile: 0px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

### Mobile Optimization
- Touch-friendly button sizes (44px+)
- Vertical stack layout di mobile
- Optimized spacing
- Readable text sizes

### Tablet/Desktop
- Multi-column grids
- Horizontal layouts
- Optimized spacing
- Full feature access

## ⚡ Performance Features

### Optimizations
- Server-side rendering (Next.js 16)
- Static generation di mana possible
- Streaming untuk faster initial load
- Image optimization (automatic)
- Code splitting

### Caching
- Browser caching
- Supabase query caching (optional)
- Next.js automatic revalidation

## 🌙 Dark Mode

- Automatic detection based on system preference
- Manual toggle (via next-themes, optional)
- Smooth transitions
- All components support both themes
- CSS variables untuk theming

## ♿ Accessibility

- Semantic HTML
- ARIA labels di components
- Keyboard navigation support
- Focus indicators
- Color contrast compliant (WCAG AA)
- Screen reader friendly

## 📡 API Endpoints

### Server Actions (in app/actions/snippets.ts)
- `uploadSnippet()` - Create snippet
- `getSnippets()` - Fetch snippets (paginated)
- `getSnippetById()` - Get single snippet
- `deleteSnippet()` - Delete snippet
- `updateSnippet()` - Update snippet metadata

### Route Handlers
- `POST /api/snippets/[id]/delete` - Delete endpoint
- `POST /auth/logout` - Logout endpoint

## 📊 Database Schema

### Tables
- **auth.users** - Managed by Supabase
- **profiles** - User profiles
- **snippets** - Code snippets

### Relationships
- User → Profiles (1:1)
- User → Snippets (1:N)

### Policies (RLS)
- Users see only own snippets + public
- Users can edit/delete only own snippets
- All policies use auth.uid()

## 🚀 Future Enhancement Ideas

- [ ] Syntax highlighting themes
- [ ] Code commenting/annotations
- [ ] User following system
- [ ] Snippet tags/categorization
- [ ] Comments on snippets
- [ ] Snippet analytics (views, downloads)
- [ ] Public API
- [ ] Browser extensions
- [ ] Mobile app
- [ ] Collaborative editing
- [ ] Import from GitHub Gists
- [ ] Export collection
- [ ] Snippet versioning
- [ ] Code execution/testing
- [ ] Snippet ratings/reviews

## 📝 Content Guidelines

### Snippet Title
- 3-100 characters
- Descriptive and clear
- No personal info

### Code
- Max 1MB
- Clean and commented (recommended)
- Legal content only

### Description
- Optional but recommended
- Explain purpose/usage
- Mention key features
- Keep under 500 characters

---

**Need Help?** Check README.md atau DEPLOYMENT.md untuk lebih lanjut.
