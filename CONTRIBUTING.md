# Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada Interactive Learning Hub - Autodesk Inventor Indonesia!

## Cara Berkontribusi

### 1. Menambahkan Konten Pelajaran

Konten pelajaran dapat ditambahkan di:
- File: `app/courses/[moduleId]/lesson/[lessonId]/page.tsx`
- Format: Markdown
- Struktur: Gunakan format yang sudah ada sebagai template

### 2. Menambahkan File Latihan

File latihan dapat ditambahkan di:
- File: `components/exercise-list.tsx`
- Tambahkan object baru ke array `exercises`
- Pastikan link Google Drive dan YouTube valid

### 3. Menambahkan Badge Baru

Badge baru dapat ditambahkan di:
- File: `components/badges-display.tsx`
- Tambahkan definisi badge di `badgeDefinitions`
- Update logic pemberian badge di backend

### 4. Meningkatkan UI/UX

- Gunakan Tailwind CSS untuk styling
- Ikuti design system yang sudah ada (Blue, Gray, White)
- Pastikan responsive untuk mobile

## Standar Kode

- Gunakan TypeScript
- Follow ESLint rules
- Gunakan functional components dengan hooks
- Comment untuk logic yang kompleks

## Testing

Sebelum submit:
- Test di development mode
- Pastikan tidak ada error di console
- Test responsive design
- Test di browser berbeda

## Pull Request Process

1. Fork repository
2. Buat branch untuk fitur baru
3. Commit perubahan dengan pesan yang jelas
4. Push ke branch Anda
5. Buat Pull Request dengan deskripsi lengkap

Terima kasih atas kontribusinya! 🎉


