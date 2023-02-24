import { useQuery } from "@tanstack/react-query";

export const useCrystalBalance = () => {
  return useQuery<string>(["crystals"], async () => {
    const response = await fetch("/api/getCrystals");
    return response.json();
  });
};
