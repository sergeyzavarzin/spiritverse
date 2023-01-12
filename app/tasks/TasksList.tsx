'use client';

import { useTasks } from '../../hooks/useTasks';
import { CrystalPoints } from '../../components/icons/CrystalPoints';
import { Task } from '../../types/tasks';
import { AirtableFormModal } from '../../components/AirtableFormModal';
import { useState } from 'react';

export const TasksList = () => {
  const { data, isFetching } = useTasks();

  const [link, setLink] = useState<string | undefined>(undefined);

  const handleTaskClick = (task: Task) => {
    setLink(task?.info?.link ?? undefined);
  };

  const handleModalClose = () => {
    setLink(undefined);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border-[1px] border-solid border-border">
      <div className="flex w-full items-center justify-between bg-[#3C444D] py-5 px-10">
        <div className="text-3xl">Мои задания</div>
        <div className="flex gap-5">
          <span className="text-2xl text-gray">Выполнено</span>
          <span className="text-2xl">35%</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-6 px-4">
        {isFetching && (
          <div role="status" className="flex animate-pulse flex-col gap-4">
            <div className="dark:bg-gray-700 h-28 w-full rounded-2xl bg-gray"></div>
            <div className="dark:bg-gray-700 h-28 w-full rounded-2xl bg-gray"></div>
            <div className="dark:bg-gray-700 h-28 w-full rounded-2xl bg-gray"></div>
          </div>
        )}
        {!isFetching &&
          data?.length &&
          data.map((task) => (
            <div
              key={task.id}
              className="flex h-28 w-full flex-wrap overflow-hidden rounded-2xl border-[1px] border-solid border-border hover:cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex basis-1/6 items-center justify-center bg-gradient-to-b from-backgroundHeroStart to-backgroundHeroStop">
                <div className="h-10 w-10 rounded-full bg-paramRed" />
              </div>
              <div className="flex w-5/6 flex-col justify-between p-5">
                <div className="flex justify-between">
                  <div className="text-gray">{task.info.title}</div>
                  <div className="text-gray">
                    {task.value}/{task.info.goal}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray">{task.info.description}</div>
                  <div className="flex items-center gap-2 text-xl">
                    <CrystalPoints />
                    <span>{task.info.reward}</span>
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
