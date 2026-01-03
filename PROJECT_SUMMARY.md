# Interactive Learning Hub - Autodesk Inventor Indonesia

## 🎯 Overview

Platform pembelajaran interaktif gratis untuk Autodesk Inventor, dirancang khusus untuk siswa SMK di Indonesia. Platform ini 100% gratis dan menggunakan teknologi free tier terbaik.

## ✨ Fitur Utama

### 1. Landing Page Modern
- Hero section dengan CTA yang jelas
- Features showcase
- Statistics section
- Engineering aesthetic (Blue, Gray, White)

### 2. Course Dashboard
- 5 Level Pembelajaran:
  - **Level Dasar**: 12 pelajaran
  - **Level Menengah**: 15 pelajaran
  - **Level Lanjutan**: 18 pelajaran
  - **Spesialisasi**: 20 pelajaran
  - **Jalur LKS Nasional**: 25 pelajaran khusus kompetisi

### 3. Progress Tracking
- Visual progress bar untuk setiap modul
- Overall progress tracking
- Completed lessons tracking
- Real-time updates

### 4. Exercise File Repository
- Search functionality
- Category filters
- File information (type, size)
- Direct download links (Google Drive)
- YouTube video links

### 5. Q&A Forum
- Post creation
- Category-based organization
- Tags system
- Reply system (ready for implementation)
- View counter

### 6. Gamification System
- Badge system:
  - Inventor Apprentice (Level Dasar)
  - Inventor Intermediate (Level Menengah)
  - Inventor Advanced (Level Lanjutan)
  - Inventor Specialist (Spesialisasi)
  - LKS Champion (Jalur LKS)

### 7. User Authentication
- Sign up / Sign in dengan Supabase
- Protected routes
- User dashboard
- Progress persistence

### 8. LKS National Path
- Dedicated page untuk persiapan LKS
- Tips dari juara
- Best practices
- Time management strategies

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Markdown**: react-markdown + remark-gfm
- **Date Formatting**: date-fns
- **Deployment**: Vercel (Free Tier)

## 📁 Struktur Project

```
├── app/
│   ├── auth/              # Authentication pages
│   ├── courses/           # Course pages
│   ├── dashboard/         # User dashboard
│   ├── exercises/         # Exercise repository
│   ├── forum/             # Forum pages
│   ├── lks-path/          # LKS dedicated page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/            # Reusable components
├── lib/                   # Utilities & Supabase clients
├── middleware.ts          # Auth middleware
└── supabase-schema.sql    # Database schema
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

3. **Setup Supabase Database**
   - Create Supabase project
   - Run SQL from `supabase-schema.sql`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**
   - Push to GitHub
   - Connect to Vercel
   - Add environment variables
   - Deploy!

## 📊 Database Schema

### Tables:
- `user_progress`: Track user progress per module
- `user_badges`: Store earned badges
- `forum_posts`: Forum posts
- `forum_replies`: Forum replies
- `exercise_files`: Exercise file metadata (optional)

### Security:
- Row Level Security (RLS) enabled
- Users can only access their own data
- Public read access for forum posts

## 🎨 Design System

### Colors:
- **Primary**: Blue (#2563EB)
- **Secondary**: Gray (#6B7280)
- **Accent**: White
- **Success**: Green
- **Warning**: Orange
- **Error**: Red

### Typography:
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes
- **Body**: Regular, readable sizes

## 📝 Content Management

### Adding Lessons:
1. Edit `app/courses/[moduleId]/lesson/[lessonId]/page.tsx`
2. Add content in Markdown format
3. Update lesson list in module page

### Adding Exercises:
1. Edit `components/exercise-list.tsx`
2. Add new exercise object
3. Include download and video links

### Adding Badges:
1. Edit `components/badges-display.tsx`
2. Add badge definition
3. Update badge earning logic

## 🔒 Security Features

- Supabase Row Level Security
- Protected API routes
- Secure authentication
- Input validation
- XSS protection (React)

## 📈 SEO Optimization

- Meta tags in layout
- Semantic HTML
- Open Graph tags
- Structured data ready
- Sitemap ready (can be added)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons
- Optimized images
- Fast loading

## 🎯 Future Enhancements

- [ ] Video player integration
- [ ] Advanced search
- [ ] Email notifications
- [ ] Social sharing
- [ ] Certificate generation
- [ ] Leaderboard
- [ ] Admin dashboard
- [ ] Content management system

## 📄 License

This project is created for educational purposes and is free to use.

## 🙏 Credits

Built with ❤️ for Indonesian SMK students learning Autodesk Inventor.

---

**Status**: ✅ Ready for Deployment
**Last Updated**: 2024


