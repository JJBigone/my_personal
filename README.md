# Personal Portfolio Website — Liquid Glass Earth Tone

Modern, production-ready Personal Portfolio Website crafted with a tactile **Liquid Glass design system**, featuring an **Earth Tone color palette** (forest green, warm sand, olive, and cream), **Supabase Auth & Database**, **Row Level Security (RLS)**, and full project management capabilities.

---

## 🌟 Key Features

1. **Liquid Glass UI & Earth Tone Aesthetic:**
   - Apple-inspired translucent glass materials (`backdrop-filter`, subtle saturation, inner reflections, organic ambient blobs).
   - Carefully balanced Earth Tone palette: Forest Green (`#243D32`), Sage (`#82977B`), Sand Beige (`#D9C8AA`), Cream (`#F3EBDD`), and Warm Brown (`#4B382D`).
   - Editorial typography using Google Fonts (Manrope for headings, Inter for body).

2. **Multi-Page Architecture (React Router):**
   - `/` — Modern Hero section, featured works, creative philosophy, and call to action.
   - `/about` — Biography, milestones timeline, creative approach, and personal interests.
   - `/projects` — Filterable portfolio grid by category with live search.
   - `/projects/:slug` — Dedicated project case study details page with live demo links and tech stack.
   - `/skills` — Technical capabilities across Frontend, Backend, UI/UX, Gaming, and Video.
   - `/contact` — Secure contact form persisted to Supabase database.

3. **Secure Admin Portal:**
   - `/admin/login` — Email & password authentication with Supabase Auth.
   - `/admin` — Overview dashboard with live statistics (Total, Published, Drafts, Messages).
   - `/admin/projects` — Full project CRUD management table with one-click publish/unpublish toggle.
   - `/admin/projects/new` & `/admin/projects/:id/edit` — Comprehensive project editor with auto-slug generation, image upload, and draft saving.
   - `/admin/messages` — Review and reply to client inquiries.
   - `/admin/settings` — Database connection diagnostics and security policies.

4. **Resilient Data Layer & Fallbacks:**
   - Real-time Supabase PostgreSQL integration.
   - Automatic local storage persistence fallback for offline or development environments.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
bun install
# or npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and verify your Supabase keys:
```env
VITE_SUPABASE_URL=https://tblzraazsmzsetmfrntp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_U447qcmKIwSHOMMHUtuGKA_xXO0H8xk
```

### 3. Run Development Server
```bash
bun run dev
```

---

## 🗄️ Supabase Database & Security Setup

To setup your Supabase database tables, Row Level Security (RLS) policies, and storage bucket, run the SQL script located in:

📄 **[supabase_schema.sql](file:///d:/Project/my_personal/supabase_schema.sql)**

1. Go to your **Supabase Dashboard** -> **SQL Editor**.
2. Paste the contents of `supabase_schema.sql` and click **Run**.
3. Create your first admin user in **Supabase Auth** -> **Users**, then add their `user_id` to `public.admin_users`:
   ```sql
   INSERT INTO public.admin_users (user_id, role)
   VALUES ('YOUR_AUTH_USER_UUID', 'owner');
   ```

---

## 🛠️ Build for Production
```bash
bun run build
```
Build output will be generated in `/dist` ready for instant deployment on Vercel or any modern static web host.
