Ringkasan Proyek: Platform Edukasi Autodesk Inventor Indonesia
Platform pembelajaran berbasis web menggunakan Next.js 14 (App Router), Tailwind CSS, dan Supabase. Sistem dirancang untuk menyediakan kurikulum teknik terstruktur (Dasar, Menengah, Lanjutan, Spesialisasi) dengan fitur pelacakan progres, sistem badge, dan forum diskusi. Data disimpan secara relasional di Supabase dengan otentikasi terintegrasi. Deployment ditargetkan ke Vercel dengan dukungan mode demo jika variabel lingkungan backend tidak tersedia. Penambahan fitur terbaru mencakup checklist kompetensi tingkat ahli dan manajemen privasi data progres pengguna.

Prompt AI Agent Builder
Implementasikan fitur "Inventor Expert Checklist" dan manajemen akses progres pada struktur proyek Next.js 14 + Supabase yang sudah ada dengan spesifikasi teknis berikut:

Skema Database (Supabase SQL):

Tabel expert_skills: id (uuid), category (text), skill_name (text).

Tabel user_skills_progress: user_id (uuid, references auth.users), skill_id (uuid, references expert_skills), completed (boolean), updated_at (timestamp).

Tabel access_permissions: requester_id (uuid), target_user_id (uuid), status (enum: 'pending', 'approved', 'rejected').

Logika Otorisasi Admin:

Identifikasi email wildanibnujamil30@gmail.com sebagai Admin di tingkat aplikasi dan database.

Terapkan Row Level Security (RLS) di Supabase:

Tabel user_skills_progress: Admin memiliki akses SELECT untuk semua baris. User non-admin hanya memiliki akses SELECT pada user_id miliknya sendiri.

Tabel access_permissions: Hanya Admin yang memiliki izin UPDATE pada kolom status.

Fitur Antarmuka (UI):

Dashboard Admin: Halaman khusus untuk email wildanibnujamil30@gmail.com yang menampilkan daftar seluruh pengguna beserta persentase penyelesaian checklist mereka. Tambahkan daftar permintaan akses (access requests) yang masuk dari user lain.

Checklist User: Halaman bagi pengguna untuk menandai keahlian yang sudah dikuasai.

Sistem Permintaan Akses: Tombol "Minta Izin Lihat Progres" pada profil pengguna lain yang akan mengirimkan entri ke tabel access_permissions.

Integrasi Server-side:

Gunakan supabase/server.ts untuk memvalidasi sesi dan peran admin sebelum merender data sensitif di server components.

Pastikan fungsi markAsComplete pada checklist memicu update real-time ke tabel progres.

Gaya Kode: Gunakan Tailwind CSS, shadcn/ui untuk komponen checklist, dan Lucide React untuk ikon. Implementasikan penanganan error jika Supabase tidak merespons.

---

Perubahan yang telah diterapkan (implementasi):

- Menambahkan skema DB dan RLS pada `supabase-schema.sql`:
  - `expert_skills`, `user_skills_progress`, `access_permissions` ditambahkan beserta tipe enum `access_status`.
  - RLS policies dibuat untuk memastikan admin (email: `wildanibnujamil30@gmail.com`) dapat melihat semua progress, user hanya dapat melihat/menulis progres miliknya sendiri, dan hanya admin yang dapat mengubah `status` pada `access_permissions`.

- Server helpers (`lib/supabase/server.ts`):
  - `ADMIN_EMAIL` konstanta ditambahkan.
  - Fungsi `isAdmin`, `getExpertSkills`, `getUserSkillsProgress`, `getAllUsersProgress`, `getAccessRequests` ditambahkan untuk penggunaan pada server components.

- API routes:
  - `POST /api/access/request` — membuat entri permintaan akses (requester -> target).
  - `POST /api/access/decision` — (admin only) approve/reject request.
  - `POST /api/skills/mark` — upsert progress skill untuk user (menandai sebagai selesai/tidak).

- UI components:
  - `components/skills-checklist.tsx` — checklist interaktif untuk pengguna (client component).
  - `components/access-request-button.tsx` — tombol "Minta Izin Lihat Progres" untuk profil pengguna lain.
  - `components/admin-access-requests.tsx` — UI sederhana untuk admin meng-approve/reject permintaan.

- Pages:
  - `app/dashboard/skills/page.tsx` — halaman checklist (server component, memanfaatkan server helpers dan men-render `SkillsChecklist`).
  - `app/dashboard/admin/page.tsx` — halaman Admin yang hanya dapat diakses oleh admin (menampilkan daftar user dengan persentase selesai + daftar access requests).
  - `app/users/page.tsx` — daftar pengguna dengan tombol permintaan akses untuk masing-masing (contoh profil sederhana).

- Penanganan error & demo mode:
  - Semua server helpers dan API routes punya handling error sederhana dan bekerja dalam demo mode (mock client) jika variabel env Supabase belum dikonfigurasi.

Langkah berikutnya / Catatan untuk deployment:

1. Jalankan skrip `supabase-schema.sql` pada instance Supabase Anda (SQL Editor) untuk membuat tabel dan policy yang baru.
2. Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` diset di `.env.local` dan pada Vercel.
3. Untuk memeriksa admin dashboard, login menggunakan akun dengan email `wildanibnujamil30@gmail.com` (atau tambahkan pengguna tersebut di Supabase).
4. Jika diperlukan, isi tabel `expert_skills` dengan daftar keahlian awal melalui SQL atau UI Admin yang akan ditambahkan.

Jika mau, saya bisa:
- Menambahkan seeder SQL untuk `expert_skills` contoh dan memasukkannya ke `supabase-schema.sql` ✔️
- Tambahkan halaman profil yang lebih lengkap dan integrasikan tampilan progres (approved) berdasarkan `access_permissions` ✔️

Mau saya lanjutkan dengan salah satu dari dua opsi di atas?