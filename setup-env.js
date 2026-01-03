#!/usr/bin/env node

/**
 * Helper script to create .env.local file
 * Run: node setup-env.js
 */

const fs = require('fs');
const path = require('path');

const envContent = `# Supabase Configuration
# Untuk DEMO MODE (UI saja), gunakan placeholder di bawah
# Untuk FITUR LENGKAP, ganti dengan credentials Supabase asli
# Dapatkan di: https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder
`;

const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  File .env.local sudah ada!');
  console.log('   Hapus file tersebut terlebih dahulu jika ingin membuat ulang.');
  process.exit(1);
}

try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ File .env.local berhasil dibuat!');
  console.log('');
  console.log('📝 File berisi placeholder values untuk DEMO MODE');
  console.log('   Aplikasi akan berjalan untuk melihat UI saja.');
  console.log('');
  console.log('🚀 Langkah selanjutnya:');
  console.log('   1. Restart development server (Ctrl+C lalu npm run dev)');
  console.log('   2. Untuk fitur lengkap, ganti values dengan Supabase credentials');
  console.log('   3. Lihat SETUP_ENV.md untuk panduan lengkap');
} catch (error) {
  console.error('❌ Error membuat file .env.local:', error.message);
  process.exit(1);
}


