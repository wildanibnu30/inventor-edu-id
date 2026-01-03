import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LessonContent } from "@/components/lesson-content";
import { MarkAsCompleteButton } from "@/components/mark-as-complete-button";

// This would typically come from a database or CMS
const lessonContent: Record<string, Record<string, { title: string; content: string }>> = {
  basic: {
    "1": {
      title: "Pengenalan Autodesk Inventor",
      content: `# Pengenalan Autodesk Inventor

Autodesk Inventor adalah software CAD (Computer-Aided Design) profesional yang digunakan untuk membuat model 3D, assembly, dan drawing teknik.

## Apa itu Autodesk Inventor?

Autodesk Inventor adalah aplikasi parametric 3D CAD modeling yang memungkinkan Anda untuk:
- Membuat model 3D dari part dan assembly
- Membuat drawing teknik 2D
- Melakukan simulasi dan analisis
- Membuat dokumentasi produk

## Keunggulan Autodesk Inventor

1. **Parametric Modeling**: Perubahan pada satu fitur akan otomatis memperbarui seluruh model
2. **Assembly Management**: Mudah mengelola assembly dengan banyak komponen
3. **Drawing Automation**: Drawing 2D dibuat otomatis dari model 3D
4. **Simulation Tools**: Built-in tools untuk analisis struktur dan motion

## Kapan Menggunakan Inventor?

Inventor cocok untuk:
- Desain mesin dan mekanik
- Desain produk manufaktur
- Desain komponen industri
- Persiapan untuk LKS (Lomba Kompetensi Siswa)

## Langkah Selanjutnya

Setelah memahami konsep dasar, kita akan mempelajari interface dan workspace di pelajaran berikutnya.`,
    },
  },
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  const lesson = lessonContent[moduleId]?.[lessonId];

  if (!lesson) {
    // For demo purposes, create a placeholder lesson
    const placeholderLesson = {
      title: `Pelajaran ${lessonId}`,
      content: `# ${lessonContent[moduleId]?.["1"]?.title || "Pelajaran"} ${lessonId}

Konten pelajaran ini sedang dalam pengembangan. 

Silakan gunakan file latihan yang tersedia di halaman [File Latihan](/exercises) untuk berlatih.

## Materi yang Akan Dibahas

- Konsep dasar
- Langkah-langkah praktis
- Tips dan trik
- Latihan soal

## Video Tutorial

Video tutorial akan tersedia di YouTube. Link akan ditambahkan segera.`,
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href={`/courses/${moduleId}`}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Modul</span>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <LessonContent title={placeholderLesson.title} content={placeholderLesson.content} />
            <MarkAsCompleteButton moduleId={moduleId} lessonId={lessonId} />
          </div>
        </div>
      </div>
    );
  }

  let isCompleted = false;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("user_progress")
        .select("completed_lesson_ids")
        .eq("user_id", user.id)
        .eq("module_id", moduleId)
        .single();

      if (data?.completed_lesson_ids) {
        isCompleted = data.completed_lesson_ids.includes(lessonId);
      }
    }
  } catch (error) {
    // Supabase not configured, continue without progress tracking
    console.warn("Supabase not configured, running in demo mode");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href={`/courses/${moduleId}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Modul</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          {isCompleted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-semibold">Pelajaran ini sudah selesai!</span>
            </div>
          )}

          <LessonContent title={lesson.title} content={lesson.content} />
          <MarkAsCompleteButton moduleId={moduleId} lessonId={lessonId} />
        </div>
      </div>
    </div>
  );
}

