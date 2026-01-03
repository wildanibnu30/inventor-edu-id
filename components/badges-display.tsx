import { Award, Trophy, Star, Target } from "lucide-react";

const badgeDefinitions: Record<string, { name: string; icon: React.ReactNode; color: string; description: string }> = {
  apprentice: {
    name: "Inventor Apprentice",
    icon: <Star className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700 border-blue-300",
    description: "Menyelesaikan Level Dasar",
  },
  intermediate: {
    name: "Inventor Intermediate",
    icon: <Target className="w-6 h-6" />,
    color: "bg-green-100 text-green-700 border-green-300",
    description: "Menyelesaikan Level Menengah",
  },
  advanced: {
    name: "Inventor Advanced",
    icon: <Award className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-700 border-purple-300",
    description: "Menyelesaikan Level Lanjutan",
  },
  specialist: {
    name: "Inventor Specialist",
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-700 border-orange-300",
    description: "Menyelesaikan Spesialisasi",
  },
};

export function BadgesDisplay({ badges }: { badges: any[] }) {
  const earnedBadgeIds = badges.map((b) => b.badge_id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Badge & Prestasi</h2>
      <div className="space-y-4">
        {Object.entries(badgeDefinitions).map(([badgeId, badge]) => {
          const isEarned = earnedBadgeIds.includes(badgeId);
          return (
            <div
              key={badgeId}
              className={`p-4 rounded-lg border-2 ${isEarned
                  ? badge.color
                  : "bg-gray-50 text-gray-400 border-gray-200"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className={isEarned ? "text-current" : "text-gray-300"}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{badge.name}</h3>
                  <p className="text-sm opacity-75">{badge.description}</p>
                </div>
                {isEarned && (
                  <span className="text-xs font-semibold bg-white px-2 py-1 rounded">
                    ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



