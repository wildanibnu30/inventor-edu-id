# Panduan Deployment - Interactive Learning Hub

## Persiapan

### 1. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com) (gratis)
2. Buat project baru
3. Salin URL dan Anon Key dari Settings > API
4. Jalankan SQL schema dari file `supabase-schema.sql` di SQL Editor

### 2. Setup Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Akses di `http://localhost:3000`

## Deployment ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy ke Vercel

1. Login ke [Vercel](https://vercel.com)
2. Klik "New Project"
3. Import repository dari GitHub
4. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik "Deploy"

### 3. Setup Supabase Auth Redirect URLs

Di Supabase Dashboard:
1. Go to Authentication > URL Configuration
2. Tambahkan URL Vercel ke "Redirect URLs"
3. Tambahkan URL Vercel ke "Site URL"

## Tips untuk Tetap Gratis

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Build time: 6000 minutes/month

### Supabase Free Tier
- ✅ 50,000 monthly active users
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth

### Strategi Optimasi

1. **Video**: Gunakan YouTube embed (tidak menghitung bandwidth Vercel)
2. **File Besar**: Gunakan Google Drive untuk file > 1MB
3. **Database**: Optimalkan queries, gunakan indexes
4. **Images**: Gunakan Next.js Image optimization
5. **Caching**: Manfaatkan Vercel Edge Caching

## Monitoring

- Vercel Analytics (gratis) untuk tracking traffic
- Supabase Dashboard untuk monitoring database usage
- Google Analytics (opsional) untuk user behavior

## Backup

1. Database: Supabase otomatis backup harian (free tier)
2. Code: GitHub sebagai backup
3. File: Google Drive untuk file latihan

## Troubleshooting

### Error: Supabase connection failed
- Pastikan environment variables sudah benar
- Check Supabase project status
- Verify RLS policies

### Error: Build failed
- Check Node.js version (harus 18+)
- Verify semua dependencies terinstall
- Check TypeScript errors

### Error: Auth not working
- Verify redirect URLs di Supabase
- Check middleware configuration
- Verify cookies settings

## Next Steps

1. ✅ Setup Supabase database
2. ✅ Deploy ke Vercel
3. ✅ Test semua fitur
4. ✅ Setup custom domain (opsional)
5. ✅ Add Google Analytics (opsional)
6. ✅ Setup email notifications (opsional)


