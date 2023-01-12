'use client';

import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSupabase } from './SupabaseProvider';

type Props = {
  onClose: () => void;
  link: string | undefined;
};
export const AirtableFormModal: FC<Props> = (props) => {
  const { link, onClose } = props;

  const { session } = useSupabase();

  const frameLink = `${link}?${new URLSearchParams({ prefill_userId: session?.user?.id ?? '', hide_userId: 'true' })}`;

  return (
    <Transition show={Boolean(link)} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="rounded bg-white">
                <iframe
                  className="airtable-embed"
                  src={frameLink}
                  width="100%"
                  height="533"
                  style={{ width: '33vw' }}
                />
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
