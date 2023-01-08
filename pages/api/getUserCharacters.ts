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

  const userCrystalsRequest = supabaseServerClient
    .from('crystals')
    .select('*')
    .eq('user_id', user?.id)
    .limit(1)
    .maybeSingle()

  const userCharactersRequest = supabaseServerClient
    .from('characters')
    .select('id, name, power, speed, health, energy, image')
    .eq('user_id', user?.id)

  const [userCrystals, userCharacters] = await Promise.all([userCrystalsRequest, userCharactersRequest])

  const result = userCharacters?.data?.map((character) => ({ ...character, crystals: userCrystals?.data?.value ?? 0 }));

  res.status(userCharacters.status).json(result ?? userCharacters.error);
}
