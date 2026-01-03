import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Circle, Clock, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const moduleData: Record<string, { title: string; lessons: Array<{ id: string; title: string; duration: string }> }> = {
  basic: {
    title: "Level Dasar",
    lessons: [
      { id: "1", title: "Pengenalan Autodesk Inventor", duration: "30 menit" },
      { id: "2", title: "Memahami Interface dan Workspace", duration: "45 menit" },
      { id: "3", title: "Dasar-dasar Sketching", duration: "1 jam" },
      { id: "4", title: "Constraint dan Dimension", duration: "1 jam" },
      { id: "5", title: "Part Modeling Dasar", duration: "1.5 jam" },
      { id: "6", title: "Extrude, Revolve, dan Loft", duration: "2 jam" },
      { id: "7", title: "Fillet, Chamfer, dan Pattern", duration: "1.5 jam" },
      { id: "8", title: "Assembly Dasar", duration: "2 jam" },
      { id: "9", title: "Constraint dalam Assembly", duration: "1.5 jam" },
      { id: "10", title: "Drawing Views Dasar", duration: "1 jam" },
      { id: "11", title: "Dimension dan Annotation", duration: "1 jam" },
      { id: "12", title: "Project: Membuat Bracket Sederhana", duration: "2 jam" },
    ],
  },
  intermediate: {
    title: "Level Menengah",
    lessons: [
      { id: "1", title: "Advanced Sketching Techniques", duration: "2 jam" },
      { id: "2", title: "3D Sketching", duration: "1.5 jam" },
      { id: "3", title: "Advanced Feature Modeling", duration: "2 jam" },
      { id: "4", title: "Multi-body Parts", duration: "1.5 jam" },
      { id: "5", title: "Assembly dengan Banyak Komponen", duration: "2.5 jam" },
      { id: "6", title: "Advanced Constraints", duration: "2 jam" },
      { id: "7", title: "Top-Down Design", duration: "2 jam" },
      { id: "8", title: "Drawing Templates", duration: "1.5 jam" },
      { id: "9", title: "Section Views dan Detail Views", duration: "1.5 jam" },
      { id: "10", title: "Bill of Materials (BOM)", duration: "1 jam" },
      { id: "11", title: "Presentation Files", duration: "1 jam" },
      { id: "12", title: "Project: Assembly Mesin Sederhana", duration: "3 jam" },
    ],
  },
  advanced: {
    title: "Level Lanjutan",
    lessons: [
      { id: "1", title: "Surface Modeling Dasar", duration: "2 jam" },
      { id: "2", title: "Advanced Surface Tools", duration: "2.5 jam" },
      { id: "3", title: "Sheet Metal Design", duration: "2 jam" },
      { id: "4", title: "Sheet Metal Unfold", duration: "1.5 jam" },
      { id: "5", title: "Weldment Design", duration: "2 jam" },
      { id: "6", title: "Frame Generator", duration: "2 jam" },
      { id: "7", title: "Simulation Basics", duration: "2 jam" },
      { id: "8", title: "Stress Analysis", duration: "2.5 jam" },
      { id: "9", title: "Dynamic Simulation", duration: "2 jam" },
      { id: "10", title: "Rendering dan Visualization", duration: "2 jam" },
      { id: "11", title: "Advanced Drawing Techniques", duration: "2 jam" },
      { id: "12", title: "Project: Kompleks Assembly", duration: "4 jam" },
    ],
  },
  specialization: {
    title: "Spesialisasi",
    lessons: [
      { id: "1", title: "Mold Design Fundamentals", duration: "2.5 jam" },
      { id: "2", title: "Mold Base dan Core/Cavity", duration: "2 jam" },
      { id: "3", title: "Machinery Design Principles", duration: "2 jam" },
      { id: "4", title: "Gear Design", duration: "2 jam" },
      { id: "5", title: "Bearing dan Fastener", duration: "1.5 jam" },
      { id: "6", title: "iLogic Basics", duration: "2 jam" },
      { id: "7", title: "Parameter dan Rules", duration: "2 jam" },
      { id: "8", title: "Automation dengan iLogic", duration: "2.5 jam" },
      { id: "9", title: "Advanced Simulation", duration: "2.5 jam" },
      { id: "10", title: "FEA Analysis", duration: "2 jam" },
      { id: "11", title: "CFD Basics", duration: "2 jam" },
      { id: "12", title: "Project: Sistem Terintegrasi", duration: "5 jam" },
    ],
  },
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = moduleData[moduleId];

  if (!currentModule) {
    notFound();
  }

  let completedLessons: string[] = [];

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
        completedLessons = data.completed_lesson_ids;
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
          href="/courses"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kursus</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentModule.title}</h1>
          <p className="text-gray-600">
            Total {currentModule.lessons.length} pelajaran. Selesaikan semua untuk mendapatkan badge!
          </p>
        </div>

        <div className="space-y-4">
          {currentModule.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/courses/${moduleId}/lesson/${lesson.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-blue-600">
                          Pelajaran {index + 1}
                        </span>
                        {isCompleted && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Selesai
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Materi + Latihan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

