# Setup Environment Variables

## Buat File .env.local

Karena file `.env.local` tidak bisa dibuat otomatis, silakan buat manual:

### Langkah 1: Buat File

Di root folder project, buat file baru dengan nama: `.env.local`

### Langkah 2: Isi dengan Template Berikut

```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder
```

### Langkah 3: Untuk Demo UI Saja (Opsional)

Jika hanya ingin melihat UI tanpa fitur auth, gunakan placeholder di atas.

### Langkah 4: Untuk Fitur Lengkap

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Buka **Settings** > **API**
4. Copy **Project URL** dan **anon public** key
5. Ganti nilai di `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

### Langkah 5: Restart Server

Setelah membuat/update `.env.local`, restart development server:

```bash
# Stop server (Ctrl+C)
# Kemudian jalankan lagi
npm run dev
```

## Catatan

- File `.env.local` sudah di-ignore oleh git (aman untuk credentials)
- Jangan commit file ini ke repository
- Untuk production, tambahkan environment variables di Vercel dashboard


