'use client';

import { useTasks } from '../../hooks/useTasks';
import { CrystalPoints } from '../../components/icons/CrystalPoints';

export const MockTasks = () => {
  const { data, isFetching } = useTasks();

  return (
    <div className="flex flex-col border-[1px] border-solid border-border rounded-3xl overflow-hidden">
      <div className="flex w-full items-center justify-between py-5 px-10 bg-[#3C444D]">
        <div className="text-3xl">Мои задания</div>
        <div className="flex gap-5">
          <span className="text-gray text-2xl">
            Выполнено
          </span>
          <span className="text-2xl">
            35%
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-6 px-4">
        {isFetching && (<div>Loading tasks...</div>)}
        {(!isFetching && data?.length) && data.map(task => (
          <div key={task.id} className="overflow-hidden flex flex-wrap border-[1px] border-solid border-border w-full rounded-2xl hover:cursor-pointer h-28">
            <div className="flex items-center justify-center basis-1/6 bg-gradient-to-b from-backgroundHeroStart to-backgroundHeroStop">
              <div className="w-10 h-10 rounded-full bg-paramRed" />
            </div>
            <div className="flex p-5 w-5/6 flex-col justify-between">
              <div className="flex justify-between">
                <div className="text-gray">{task.info.title}</div>
                <div className="text-gray">{task.value}/{task.info.goal}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray">{task.info.description}</div>
                <div className="text-xl flex gap-2 items-center">
                  <CrystalPoints/>
                  <span>{task.info.reward}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
