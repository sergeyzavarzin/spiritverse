import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Task } from '../types/tasks';

export const useTasks = (options?: UseQueryOptions) => {
  return useQuery<Task[], Error>(['tasks'], async () => {
    const response = await fetch('/api/getTasks');
    return response.json();
  }, options as unknown as any)
}