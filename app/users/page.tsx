import { createClient } from '@/lib/supabase/server';
import { AccessRequestButton } from '@/components/access-request-button';

export default async function UsersPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: users } = await supabase.from('auth.users').select('id, email');

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Daftar Pengguna</h1>
            <p className="text-gray-600">Kamu bisa meminta izin untuk melihat progres pengguna lain</p>
          </div>

          <div className="grid gap-4">
            {(users || []).map((u: any) => (
              <div key={u.id} className="bg-white rounded-lg p-4 border flex items-center justify-between">
                <div>
                  <div className="font-semibold">{u.email}</div>
                </div>
                <div>
                  {user?.id === u.id ? <span className="text-sm text-gray-500">(Ini kamu)</span> : <AccessRequestButton targetUserId={u.id} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded">Gagal memuat daftar pengguna.</div>
        </div>
      </div>
    );
  }
}
