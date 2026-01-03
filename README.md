# Interactive Learning Hub - Autodesk Inventor Indonesia

Platform pembelajaran interaktif gratis untuk Autodesk Inventor, dirancang khusus untuk siswa SMK di Indonesia.

## Fitur Utama

- 📚 Kurikulum Terstruktur (Dasar, Menengah, Lanjutan, Spesialisasi, LKS)
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

Platform ini dibuat untuk mendukung pendidikan teknik di Indonesia. Semua konten tersedia gratis untuk siswa SMK.


