import { isAdmin, getAllUsersProgress, getAccessRequests } from '@/lib/supabase/server';
import { AdminAccessRequests } from '@/components/admin-access-requests';

export default async function AdminPage() {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg p-6 border text-center">
              <h2 className="text-xl font-semibold">Unauthorized</h2>
              <p className="text-gray-600">Halaman ini hanya untuk admin.</p>
            </div>
          </div>
        </div>
      );
    }

    const { data: aggregated } = await getAllUsersProgress();
    const { data: requests } = await getAccessRequests();

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Daftar pengguna dan persentase penyelesaian checklist</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Users Progress</h3>
              <div className="space-y-3">
                {(aggregated || []).map((u: any) => (
                  <div key={u.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-semibold">{u.email}</div>
                      <div className="text-sm text-gray-500">{u.completedCount}/{u.totalSkills} skills</div>
                    </div>
                    <div className="text-blue-600 font-semibold">{u.percent}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <AdminAccessRequests requests={requests || []} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded">Gagal memuat data admin. Coba lagi nanti.</div>
        </div>
      </div>
    );
  }
}
