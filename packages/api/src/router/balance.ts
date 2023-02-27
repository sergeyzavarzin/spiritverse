import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const balanceRouter = createTRPCRouter({
  tokens: publicProcedure.query(async ({ ctx: { supabase } }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("tokens")
      .select("value")
      .eq("user_id", user?.id)
      .limit(1)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.value as number;
  }),

  crystals: protectedProcedure.query(async ({ ctx: { supabase } }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("crystals")
      .select("value")
      .eq("user_id", user?.id)
      .limit(1)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.value as number;
  }),
});
