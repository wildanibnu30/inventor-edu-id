import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Mock Supabase client for demo mode
const createMockClient = () => {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: async () => ({ data: null, error: null }),
          data: null,
          error: null 
        }),
        data: null, 
        error: null 
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ eq: () => ({ data: null, error: null }) }),
      upsert: async () => ({ data: null, error: null }),
    }),
  } as any;
};

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are missing or are placeholders, use mock client for demo mode
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl.includes('placeholder') || 
      supabaseAnonKey.includes('placeholder')) {
    console.warn('⚠️ Supabase not configured - running in DEMO MODE. Create .env.local for full features.');
    return createMockClient();
  }

  try {
    const cookieStore = await cookies();
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: any) {
          try {
            cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: any }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });
  } catch (error) {
    console.warn('⚠️ Failed to create Supabase client - running in DEMO MODE');
    return createMockClient();
  }
}

// Application level admin identification
export const ADMIN_EMAIL = 'wildanibnujamil30@gmail.com';

// Check if current session user is the configured admin
export async function isAdmin() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return !!user && user.email === ADMIN_EMAIL;
  } catch (e) {
    console.warn('Failed to determine admin status');
    return false;
  }
}

// Fetch list of expert skills (server-side)
export async function getExpertSkills() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('expert_skills').select('*').order('category', { ascending: true }).order('skill_name', { ascending: true });
    return { data, error };
  } catch (error) {
    console.warn('Failed to fetch expert skills', error);
    return { data: null, error };
  }
}

// Fetch a user's skills progress
export async function getUserSkillsProgress(userId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('user_skills_progress').select('skill_id, completed, updated_at').eq('user_id', userId);
    return { data, error };
  } catch (error) {
    console.warn('Failed to fetch user skills progress', error);
    return { data: null, error };
  }
}

// Aggregate all users' completion percentages (admin usage)
export async function getAllUsersProgress() {
  try {
    const supabase = await createClient();

    // Get all users (server-side admin scoped request)
    const { data: users } = await supabase.from('auth.users').select('id, email');
    const { data: skills } = await supabase.from('expert_skills').select('id');
    const totalSkills = Array.isArray(skills) ? skills.length : 0;

    if (!Array.isArray(users)) return { data: [], error: null };

    const aggregated = await Promise.all(
      users.map(async (u: any) => {
        const { count } = await supabase
          .from('user_skills_progress')
          .select('skill_id', { count: 'exact', head: false })
          .eq('user_id', u.id)
          .eq('completed', true);

        const completedCount = typeof count === 'number' ? count : 0;
        const percent = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

        return {
          id: u.id,
          email: u.email,
          completedCount,
          totalSkills,
          percent,
        };
      })
    );

    return { data: aggregated, error: null };
  } catch (error) {
    console.warn('Failed to aggregate users progress', error);
    return { data: null, error };
  }
}

// Get pending access requests (for admin dashboard)
export async function getAccessRequests() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('access_permissions').select('*').order('created_at', { ascending: false });
    return { data, error: null };
  } catch (error) {
    console.warn('Failed to fetch access requests', error);
    return { data: null, error };
  }
}

