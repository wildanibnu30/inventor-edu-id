# Interactive Learning Hub - Autodesk Inventor Indonesia

Platform pembelajaran interaktif gratis untuk Autodesk Inventor, dirancang untuk penggiat teknik di Indonesia.

## Fitur Utama

- 📚 Kurikulum Terstruktur (Dasar, Menengah, Lanjutan, Spesialisasi)
- 📊 Progress Tracking dengan Visual Progress Bar
- 📁 Repository File Latihan dengan Pencarian
- 💬 Forum Q&A untuk Diskusi
- 🏆 Sistem Badge (Gamifikasi)
- 🔐 Autentikasi Siswa dengan Supabase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Deployment**: Vercel (Free Tier)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env.local
```

3. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run development server:
```bash
npm run dev
```

## Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Kontribusi

Platform ini dibuat untuk mendukung pendidikan teknik di Indonesia. Semua konten tersedia gratis untuk semua pembelajar.

---

## Inventor Expert Checklist & Access Requests (baru)

- Tambahan tabel DB: `expert_skills`, `user_skills_progress`, `access_permissions` (lihat `supabase-schema.sql`).
- Admin aplikasi ditentukan oleh email `wildanibnujamil30@gmail.com`. Admin dapat melihat semua progress dan menyetujui/menolak permintaan akses.
- Cara setup singkat:
  1. Jalankan SQL `supabase-schema.sql` di project Supabase.
  2. Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local` atau di Vercel.
  3. Masuk sebagai admin (email di atas) untuk melihat halaman Admin (`/dashboard/admin`).

Fitur baru:
- Halaman checklist pengguna: `/dashboard/skills` (login diperlukan)
- Daftar pengguna & tombol "Minta Izin Lihat Progres": `/users`
- API: `/api/access/request`, `/api/access/decision`, `/api/skills/mark`

Catatan: Proyek tetap mendukung demo mode jika variabel lingkungan Supabase tidak dikonfigurasi (mock client).



