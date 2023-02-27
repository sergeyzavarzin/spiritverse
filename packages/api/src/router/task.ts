import { Task } from "@spirit/types";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx: { supabase } }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_tasks")
      .select(
        "id, value, done, info:tasks!inner(id, title, description, reward, goal, target, category, link, starts_at, ends_at)",
      )
      .is("info.active", true)
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data as Task[];
  }),
});
