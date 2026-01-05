"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function AccessRequestButton({ targetUserId }: { targetUserId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  const sendRequest = async () => {
    setErr(null);
    setStatus('loading');
    try {
      const res = await fetch('/api/access/request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ targetUserId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send request');
      setStatus('sent');
    } catch (e: any) {
      setErr(e?.message || 'Error');
      setStatus('error');
    }
  };

  return (
    <div>
      <button onClick={sendRequest} disabled={status === 'loading' || status === 'sent'} className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
        <Mail className="w-4 h-4" />
        <span>{status === 'sent' ? 'Request Sent' : 'Minta Izin Lihat Progres'}</span>
      </button>
      {err && <div className="text-sm text-red-600 mt-2">{err}</div>}
    </div>
  );
}
