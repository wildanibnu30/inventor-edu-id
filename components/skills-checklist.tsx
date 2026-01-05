"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export default function SkillsChecklist({ skills, initialProgress }: { skills: any[]; initialProgress: any[] }) {
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    (initialProgress || []).forEach((p: any) => (map[p.skill_id] = !!p.completed));
    return map;
  });

  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggle = async (skillId: string) => {
    setErrorMsg(null);
    const current = !!progressMap[skillId];
    setLoading((s) => ({ ...s, [skillId]: true }));

    try {
      const res = await fetch('/api/skills/mark', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ skillId, completed: !current }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to update');

      setProgressMap((s) => ({ ...s, [skillId]: !current }));
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error');
    } finally {
      setLoading((s) => ({ ...s, [skillId]: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Inventor Expert Checklist</h2>
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">{errorMsg}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s.id} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{s.skill_name}</div>
              <div className="text-xs text-gray-500">{s.category}</div>
            </div>
            <div>
              <button
                onClick={() => toggle(s.id)}
                disabled={!!loading[s.id]}
                className={`py-2 px-3 rounded-lg font-semibold transition ${progressMap[s.id] ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {loading[s.id] ? (
                  <div className="flex items-center space-x-2"><Loader2 className="w-4 h-4 animate-spin"/></div>
                ) : progressMap[s.id] ? (
                  <div className="flex items-center space-x-2"><CheckCircle className="w-4 h-4"/> <span>Completed</span></div>
                ) : (
                  <span>Mark</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
