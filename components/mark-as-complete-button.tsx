"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function MarkAsCompleteButton({
  moduleId,
  lessonId,
}: {
  moduleId: string;
  lessonId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleMarkComplete = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Get current progress
    const { data: currentProgress } = await supabase
      .from("user_progress")
      .select("completed_lesson_ids, completed_lessons")
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .single();

    const completedLessonIds = currentProgress?.completed_lesson_ids || [];
    const completedLessons = currentProgress?.completed_lessons || 0;

    if (!completedLessonIds.includes(lessonId)) {
      const newCompletedIds = [...completedLessonIds, lessonId];
      const newCompletedCount = completedLessons + 1;

      const { error } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          completed_lesson_ids: newCompletedIds,
          completed_lessons: newCompletedCount,
          updated_at: new Date().toISOString(),
        });

      if (!error) {
        setIsCompleted(true);
        router.refresh();
      }
    } else {
      setIsCompleted(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={handleMarkComplete}
        disabled={isLoading || isCompleted}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
          isCompleted
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Menyimpan...</span>
          </>
        ) : isCompleted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Pelajaran Selesai</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Tandai Sebagai Selesai</span>
          </>
        )}
      </button>
    </div>
  );
}



