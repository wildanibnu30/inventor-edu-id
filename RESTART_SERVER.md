# Restart Development Server

## File .env.local sudah dibuat! ✅

Sekarang Anda perlu **restart development server** agar perubahan environment variables terbaca.

## Cara Restart:

### Di Terminal:
1. Tekan **Ctrl+C** untuk stop server yang sedang berjalan
2. Jalankan lagi: `npm run dev`

### Atau:
- Tutup terminal dan buka terminal baru
- Jalankan: `npm run dev`

## Setelah Restart:

✅ Aplikasi akan berjalan tanpa error
✅ UI bisa dilihat (landing page, courses, exercises, forum)
⚠️ Fitur auth belum aktif (perlu Supabase credentials asli)

## Untuk Fitur Lengkap:

Ganti values di `.env.local` dengan Supabase credentials asli:
1. Buat akun di https://supabase.com
2. Buat project baru
3. Buka Settings > API
4. Copy Project URL dan anon public key
5. Ganti di `.env.local`
6. Restart server lagi

Lihat `SETUP_ENV.md` untuk panduan lengkap.


