import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';
import { Battle } from '../../utils/battle';
import { Character } from '../../types/battle';

export default async function getRival(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const characterId = req.query?.characterId as string; // TODO: check query args type

  if (!characterId) {
    res.status(404).json({ message: 'characterId is not provided' });
  }

  const characterRequest = await supabaseServerClient
    .from('characters')
    .select('*')
    .eq('id', characterId)
    .limit(1)
    .single();

  if (characterRequest.error) {
    console.error('characterRequest error: ', characterRequest.error);
    res.status(characterRequest.status).json(characterRequest.error);
    return;
  }

  if (characterRequest.data.energy <= 0) {
    res.status(400).json({ message: 'selected character have no enough energy' });
    return;
  }

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(400).json({ message: 'user is not defined' });
    return;
  }

  const rivalRequest = await supabaseServerClient // TODO: make as rpc function
    .from('random_characters')
    .select('*')
    .not('user_id', 'eq', user.id) // not current user characters
    .not('user_id', 'is', null) // only owned characters
    .limit(1)
    .single();

  if (rivalRequest.error) {
    console.error('rivalRequest error: ', rivalRequest.error);
    res.status(rivalRequest.status).json(rivalRequest.error);
    return;
  }

  const rivalCrystalsRequest = await supabaseServerClient
    .from('crystals')
    .select('value')
    .eq('user_id', rivalRequest.data?.user_id)
    .limit(1)
    .single();

  if (rivalCrystalsRequest.error) {
    console.error('rivalCrystalsRequest error: ', rivalCrystalsRequest.error);
    res.status(rivalCrystalsRequest.status).json(rivalCrystalsRequest.error);
    return;
  }

  const character: Character = { ...characterRequest.data, crystals: 0 };

  const rival: Character = { ...rivalRequest.data, crystals: 0 } as Character;

  const battle = new Battle(character, rival);

  const { win } = battle.getImmediateBattleResult();
  
  await supabaseServerClient.rpc('fight_battle', {
    uid: user.id,
    character_id: characterId,
    win: win ? 0.1 : 0,
  });

  res.status(200).json(rival);
}
