import type { Database } from "../supabase";

type CharacterRecord = Database["public"]["Tables"]["characters"]["Row"];

export type Character = Omit<CharacterRecord, "created_at" | "user_id"> & {
  crystals: number;
};
