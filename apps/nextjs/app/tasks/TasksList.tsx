"use client";

import { Task } from "@spirit/types";
import { useState } from "react";
import { AirtableFormModal } from "../../components/AirtableFormModal";
import { CrystalPoints } from "../../components/icons/CrystalPoints";
import { trpc } from "../../contexts/TRPCProvider";

export const TasksList = () => {
  const { data, isFetching } = trpc.task.all.useQuery();

  const [link, setLink] = useState<string | undefined>(undefined);

  const handleTaskClick = (task: Task) => {
    setLink(task?.info?.link ?? undefined);
  };

  const handleModalClose = () => {
    setLink(undefined);
  };

  return (
    <div className="border-border flex flex-col overflow-hidden rounded-3xl border border-solid">
      <div className="flex w-full items-center justify-between bg-[#3C444D] py-5 px-10">
        <div className="text-3xl">Мои задания</div>
        <div className="flex gap-5">
          <span className="text-gray text-2xl">Выполнено</span>
          <span className="text-2xl">35%</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-6 px-4">
        {isFetching && (
          <div role="status" className="flex animate-pulse flex-col gap-4">
            <div className="bg-gray h-28 w-full rounded-2xl dark:bg-gray-700"></div>
            <div className="bg-gray h-28 w-full rounded-2xl dark:bg-gray-700"></div>
            <div className="bg-gray h-28 w-full rounded-2xl dark:bg-gray-700"></div>
          </div>
        )}
        {!isFetching &&
          data?.length &&
          data.map((task) => (
            <div
              key={task?.id}
              className="border-border flex h-28 w-full flex-wrap overflow-hidden rounded-2xl border border-solid hover:cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <div className="from-backgroundHeroStart to-backgroundHeroStop flex basis-1/6 items-center justify-center bg-gradient-to-b">
                <div className="bg-paramRed h-10 w-10 rounded-full" />
              </div>
              <div className="flex w-5/6 flex-col justify-between p-5">
                <div className="flex justify-between">
                  <div className="text-gray">{task?.info?.title}</div>
                  <div className="text-gray">
                    {task?.value}/{task?.info?.goal}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray">{task?.info?.description}</div>
                  <div className="flex items-center gap-2 text-xl">
                    <CrystalPoints />
                    <span>{task?.info?.reward}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <AirtableFormModal link={link} onClose={handleModalClose} />
    </div>
  );
};
