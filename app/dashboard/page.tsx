import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProgressOverview } from "@/components/progress-overview";
import { BadgesDisplay } from "@/components/badges-display";
import { RecentActivity } from "@/components/recent-activity";

export default async function DashboardPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect("/auth/login");
    }

    // Get user progress
    const { data: progress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id);

    // Get user badges
    const { data: badges } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", user.id);

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-xl text-gray-600">
              Selamat datang kembali, {user.user_metadata?.name || "Siswa"}!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProgressOverview progress={progress || []} />
              <RecentActivity userId={user.id} />
            </div>
            <div>
              <BadgesDisplay badges={badges || []} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Supabase not configured, redirect to login
    redirect("/auth/login");
  }
}

