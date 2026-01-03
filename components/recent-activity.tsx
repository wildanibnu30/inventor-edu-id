import { Clock, BookOpen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function RecentActivity({ userId }: { userId: string }) {
  // In a real app, this would fetch from database
  const activities = [
    {
      type: "lesson_completed",
      module: "Level Dasar",
      lesson: "Pengenalan Autodesk Inventor",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      type: "lesson_completed",
      module: "Level Dasar",
      lesson: "Memahami Interface dan Workspace",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      type: "badge_earned",
      module: "Level Dasar",
      badge: "Inventor Apprentice",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Aktivitas Terkini</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {activity.type === "lesson_completed" ? (
                <BookOpen className="w-5 h-5 text-blue-600" />
              ) : (
                <BookOpen className="w-5 h-5 text-yellow-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                {activity.type === "lesson_completed" ? (
                  <>
                    Menyelesaikan <strong>{activity.lesson}</strong> di {activity.module}
                  </>
                ) : (
                  <>
                    Mendapatkan badge <strong>{activity.badge}</strong>
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: id })}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



