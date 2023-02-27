import { createTRPCRouter, publicProcedure } from "../trpc";

export const characterRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx: { supabase } }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userCrystalsRequest = supabase
      .from("crystals")
      .select("*")
      .eq("user_id", user?.id)
      .limit(1)
      .maybeSingle();

    const userCharactersRequest = supabase
      .from("characters")
      .select("id, name, power, speed, health, energy, image")
      .eq("user_id", user?.id);

    const [userCrystals, userCharacters] = await Promise.all([
      userCrystalsRequest,
      userCharactersRequest,
    ]);

    const result = userCharacters?.data?.map((character) => ({
      ...character,
      crystals: userCrystals?.data?.value ?? 0,
    }));

    if (userCharacters.error) {
      throw new Error(userCharacters.error.message);
    }

    return result;
  }),
});
