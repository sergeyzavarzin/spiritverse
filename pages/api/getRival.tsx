import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default async function getRival(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  })

  const characterId = req.query?.characterId as string; // TODO: check query args type

  if (!characterId) {
    res.status(404).json({ message: 'characterId is not provided' });
  }

  // TODO: add character energy checking

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  const { data: rival, error: rivalError, status } = await supabaseServerClient
    .from('random_characters')
    .select('*')
    .not('user_id', 'eq', user?.id) // not current user characters
    .not('user_id', 'is', null) // only owned characters
    .limit(1)
    .single();

  if (rivalError) {
    console.error(rivalError);
    res.status(status).json(rivalError);
    return;
  }

  const { data: crystals, error: crystalError } = await supabaseServerClient
    .from('crystals')
    .select('value')
    .eq('user_id', rival?.user_id)
    .limit(1)
    .single();

  if (crystalError) {
    console.error(crystalError);
    res.status(status).json(crystalError);
    return;
  }

  await supabaseServerClient.rpc('reduce_character_energy', { character_id: characterId });

  const result = { ...rival, crystals: crystals.value };

  res.status(status).json(result);
}
