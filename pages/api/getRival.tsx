import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default async function getRival(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const { data, error, status } = await supabaseServerClient
    .from('random_characters')
    .select('*')
    .limit(1)
    .single();

  res.status(status).json(data ?? error);
}
