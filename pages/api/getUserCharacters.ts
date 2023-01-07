import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default async function getUserCharacters(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  const { data, error, status } = await supabaseServerClient
    .from('characters')
    .select('*')
    .eq('user_id', user?.id);

  res.status(status).json(data ?? error);
}
