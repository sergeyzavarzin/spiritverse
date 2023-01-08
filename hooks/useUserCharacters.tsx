import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Character } from '../types/battle';

export const useUserCharacters = (options?: UseQueryOptions) => {
  return useQuery<Character[], Error>(['characters'], async () => {
    const response = await fetch('/api/getUserCharacters');
    return response.json();
  }, options as unknown as any)
}