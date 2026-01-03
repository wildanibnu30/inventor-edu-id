import Link from "next/link";
import { BookOpen, ArrowRight, TrendingUp } from "lucide-react";

const moduleInfo: Record<string, { title: string; totalLessons: number; color: string }> = {
  basic: { title: "Level Dasar", totalLessons: 12, color: "bg-blue-500" },
  intermediate: { title: "Level Menengah", totalLessons: 15, color: "bg-green-500" },
  advanced: { title: "Level Lanjutan", totalLessons: 18, color: "bg-purple-500" },
  specialization: { title: "Spesialisasi", totalLessons: 20, color: "bg-orange-500" },
  lks: { title: "Jalur LKS", totalLessons: 25, color: "bg-red-500" },
};

export function ProgressOverview({ progress }: { progress: any[] }) {
  const totalCompleted = progress.reduce((sum, p) => sum + (p.completed_lessons || 0), 0);
  const totalLessons = Object.values(moduleInfo).reduce((sum, m) => sum + m.totalLessons, 0);
  const overallProgress = totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Progress Pembelajaran</h2>
        <Link
          href="/courses"
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">Progress Keseluruhan</span>
          <span className="text-blue-600 font-bold text-lg">
            {totalCompleted}/{totalLessons} Pelajaran
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all flex items-center justify-end pr-2"
            style={{ width: `${overallProgress}%` }}
          >
            <span className="text-xs text-white font-semibold">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(moduleInfo).map(([moduleId, info]) => {
          const moduleProgress = progress.find((p) => p.module_id === moduleId);
          const completed = moduleProgress?.completed_lessons || 0;
          const progressPercent = (completed / info.totalLessons) * 100;

          return (
            <div key={moduleId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${info.color}`} />
                  <span className="font-semibold text-gray-800">{info.title}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {completed}/{info.totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${info.color} h-2 rounded-full transition-all`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


