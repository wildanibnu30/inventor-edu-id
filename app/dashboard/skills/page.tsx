import SkillsChecklist from '@/components/skills-checklist';
import { createClient, getExpertSkills, getUserSkillsProgress } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function SkillsPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: skills } = await getExpertSkills();
    const { data: progress } = user ? await getUserSkillsProgress(user.id) : { data: [] };

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Inventor Expert Checklist</h1>
            <p className="text-gray-600">Tandai keahlian yang sudah kamu kuasai</p>
          </div>

          {!user ? (
            <div className="bg-white rounded-lg p-6 border text-center">
              <p className="mb-4">Silakan <Link href="/auth/login" className="text-blue-600 font-semibold">masuk</Link> untuk mengakses checklist</p>
            </div>
          ) : (
            <SkillsChecklist skills={skills || []} initialProgress={progress || []} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded">Gagal memuat data. Coba lagi nanti.</div>
        </div>
      </div>
    );
  }
}
