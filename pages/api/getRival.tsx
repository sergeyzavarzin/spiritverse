import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../types/database';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function getRival(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  // const {
  //   data: { user },
  // } = await supabaseServerClient.auth.getUser()
  //
  // console.log({ user })

  const { data, error, status } = await supabaseServerClient
    .from('characters')
    .select('*')
    // .neq('user_id', user?.id)
    .limit(1)
    .maybeSingle();

  res.status(status).json(data ?? error);
}
