import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  const { data, error, status } = await supabaseServerClient
    .from('users_tasks')
    .select(
      'id, value, done, info:tasks!inner(id, title, description, reward, goal, target, category, link, starts_at, ends_at)'
    )
    .is('info.active', true)
    .eq('user_id', user?.id);
  
  if (error) {
    console.error(error);
    res.status(status).json(error);
    return;
  }

  res.status(status).json(data);
}
