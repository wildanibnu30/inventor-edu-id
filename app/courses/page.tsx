import Link from "next/link";
import { BookOpen, Clock, CheckCircle, ArrowRight, Award, Target } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const modules = [
  {
    id: "basic",
    title: "Level Dasar",
    description: "Pengenalan Autodesk Inventor, dasar-dasar modeling, dan konsep fundamental",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-500",
    lessons: 12,
    estimatedTime: "20 jam",
    topics: ["Pengenalan Interface", "Sketching Dasar", "Part Modeling", "Assembly Dasar"],
  },
  {
    id: "intermediate",
    title: "Level Menengah",
    description: "Teknik modeling lanjutan, assembly kompleks, dan drawing documentation",
    icon: <Target className="w-6 h-6" />,
    color: "bg-green-500",
    lessons: 15,
    estimatedTime: "30 jam",
    topics: ["Advanced Sketching", "Feature Modeling", "Assembly Constraints", "Drawing Views"],
  },
  {
    id: "advanced",
    title: "Level Lanjutan",
    description: "Teknik profesional, surface modeling, dan simulasi dasar",
    icon: <Award className="w-6 h-6" />,
    color: "bg-purple-500",
    lessons: 18,
    estimatedTime: "40 jam",
    topics: ["Surface Modeling", "Sheet Metal", "Weldment", "Simulation Basics"],
  },
  {
    id: "specialization",
    title: "Spesialisasi",
    description: "Topik khusus seperti mold design, machinery design, dan automation",
    icon: <Award className="w-6 h-6" />,
    color: "bg-orange-500",
    lessons: 20,
    estimatedTime: "50 jam",
    topics: ["Mold Design", "Machinery Design", "iLogic Automation", "Advanced Simulation"],
  },
];

export default async function CoursesPage() {
  let user = null;
  let progress: Record<string, number> = {};

  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    user = authUser;

    // Get user progress if logged in
    if (user) {
      const { data } = await supabase
        .from("user_progress")
        .select("module_id, completed_lessons")
        .eq("user_id", user.id);

      if (data) {
        progress = data.reduce((acc: Record<string, number>, item: any) => {
          acc[item.module_id] = item.completed_lessons || 0;
          return acc;
        }, {} as Record<string, number>);
      }
    }
  } catch (error) {
    // Supabase not configured, continue without auth features
    console.warn("Supabase not configured, running in demo mode");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Kurikulum Pembelajaran</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih level yang sesuai dengan kemampuanmu. Setiap modul dirancang untuk membangun
            fondasi yang kuat sebelum melanjutkan ke level berikutnya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const completed = progress[module.id] || 0;
            const progressPercent = module.lessons > 0 ? (completed / module.lessons) * 100 : 0;

            return (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className={`${module.color} text-white p-6`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {module.icon}
                      <h2 className="text-2xl font-bold">{module.title}</h2>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">{module.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons} Pelajaran</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.estimatedTime}</span>
                      </div>
                    </div>

                    {user && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-blue-600 font-semibold">
                            {completed}/{module.lessons}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Topik Utama:</h3>
                      <ul className="space-y-1">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/courses/${module.id}`}
                      className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-4"
                    >
                      <span>Mulai Belajar</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!user && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-gray-700 mb-4">
              <strong>Daftar sekarang</strong> untuk menyimpan progress belajarmu dan mendapatkan badge!
            </p>
            <Link
              href="/auth/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Daftar Gratis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

