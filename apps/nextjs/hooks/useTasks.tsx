import { useQuery } from "@tanstack/react-query";
import { Task } from "../types/tasks";

export const useTasks = () => {
  return useQuery<Task[], Error>(["tasks"], async () => {
    const response = await fetch("/api/getTasks");
    return response.json();
  });
};
