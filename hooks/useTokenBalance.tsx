import { useQuery } from '@tanstack/react-query';

export const useTokenBalance = () => {
  return useQuery(['tokens'], async () => {
    const response = await fetch('/api/getTokens');
    return response.json();
  })
}