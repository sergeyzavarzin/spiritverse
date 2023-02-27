import { balanceRouter } from "./router/balance";
import { characterRouter } from "./router/character";
import { taskRouter } from "./router/task";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  balance: balanceRouter,
  task: taskRouter,
  character: characterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
