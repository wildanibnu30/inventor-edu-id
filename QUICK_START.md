# Quick Start Guide

## 🚀 Setup Cepat (5 Menit)

### Langkah 1: Setup Supabase (2 menit)

1. Buka [supabase.com](https://supabase.com) dan buat akun gratis
2. Klik "New Project"
3. Isi detail project:
   - Name: `inventor-learning-hub`
   - Database Password: (simpan password ini!)
   - Region: Pilih yang terdekat (Singapore recommended)
4. Tunggu project selesai dibuat (~2 menit)

### Langkah 2: Setup Database (1 menit)

1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik **New Query**
3. Copy semua isi dari file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **Run** (atau Ctrl+Enter)
6. Pastikan tidak ada error

### Langkah 3: Get API Keys (1 menit)

1. Di Supabase Dashboard, buka **Settings** > **API**
2. Copy **Project URL** (contoh: `https://xxxxx.supabase.co`)
3. Copy **anon public** key
4. Simpan kedua nilai ini

### Langkah 4: Setup Environment (1 menit)

1. Di project folder, buat file `.env.local`
2. Isi dengan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Ganti dengan nilai dari Langkah 3

### Langkah 5: Install & Run

```bash
# Install dependencies (sudah dilakukan)
npm install

# Run development server
npm run dev
```

4. Buka browser: `http://localhost:3000`

## ✅ Checklist Setup

- [ ] Supabase project dibuat
- [ ] Database schema dijalankan
- [ ] Environment variables diisi
- [ ] Dependencies terinstall
- [ ] Development server berjalan
- [ ] Bisa akses landing page
- [ ] Bisa register/login

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Pastikan `.env.local` sudah benar
- Restart development server setelah edit `.env.local`

### Error: "relation does not exist"
- Pastikan SQL schema sudah dijalankan
- Check di Supabase Dashboard > Table Editor

### Error: "Cannot connect to Supabase"
- Check internet connection
- Verify Supabase project status
- Check URL dan key sudah benar

## 🎯 Next Steps

1. ✅ Test register/login
2. ✅ Test progress tracking
3. ✅ Add konten pelajaran
4. ✅ Add file latihan
5. ✅ Deploy ke Vercel

## 📚 Dokumentasi Lengkap

- `DEPLOYMENT.md` - Panduan deployment ke Vercel
- `PROJECT_SUMMARY.md` - Overview lengkap project
- `CONTRIBUTING.md` - Panduan kontribusi

---

**Selamat! Platform Anda siap digunakan! 🎉**


