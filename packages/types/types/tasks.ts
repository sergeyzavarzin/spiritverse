import type { Database } from "../supabase";

type TaskRecord = Database["public"]["Tables"]["tasks"]["Row"];

type UserTaskRecord = Database["public"]["Tables"]["users_tasks"]["Row"];

export type Task = Pick<UserTaskRecord, "id" | "value" | "done"> & {
  info: Pick<
    TaskRecord,
    | "id"
    | "title"
    | "description"
    | "reward"
    | "goal"
    | "target"
    | "category"
    | "link"
    | "starts_at"
    | "ends_at"
  >;
};
