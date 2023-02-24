import { useQuery } from "@tanstack/react-query";
import { Character } from "../types/battle";

export const useUserCharacters = (options: unknown = {}) => {
  return useQuery<Character[], Error>(
    ["characters"],
    async () => {
      const response = await fetch("/api/getUserCharacters");
      return response.json();
    },
    options as undefined, // TODO: fix this
  );
};
