"use client";

import { useState } from "react";

export function AdminAccessRequests({ requests }: { requests: any[] }) {
  const [local, setLocal] = useState(requests || []);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const decide = async (id: string, status: 'approved'|'rejected') => {
    setLoading((s) => ({ ...s, [id]: true }));
    try {
      const res = await fetch('/api/access/decision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      setLocal((ls) => ls.map(r => r.id === id ? { ...r, status } : r));
    } catch (e) {
      // ignore, simple UI error
    } finally {
      setLoading((s) => ({ ...s, [id]: false }));
    }
  };

  if (!local.length) return <div className="bg-white rounded-lg shadow p-4 border">No access requests</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h3 className="font-semibold mb-3">Access Requests</h3>
      <div className="space-y-3">
        {local.map((r) => (
          <div key={r.id} className="flex items-center justify-between border rounded p-3">
            <div>
              <div className="font-semibold">Requester: {r.requester_id}</div>
              <div className="text-sm text-gray-500">Target: {r.target_user_id}</div>
              <div className="text-sm text-gray-500">Status: {r.status}</div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => decide(r.id, 'approved')} disabled={loading[r.id]} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button onClick={() => decide(r.id, 'rejected')} disabled={loading[r.id]} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
