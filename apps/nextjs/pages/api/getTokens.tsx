import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default async function getCrystals(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  const { data, error, status } = await supabaseServerClient
    .from('tokens')
    .select('value')
    .eq('user_id', user?.id)
    .limit(1)
    .single();

  res.status(status).json(data?.value ?? error);
}
