import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { useSupabase } from "../contexts/SupabaseProvider";

export const Account = () => {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return (
    <div className="text-right text-black hover:text-black">
      <Menu as="div" className="z-999 relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="bg-paramYellow h-8 w-8 rounded-2xl" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="w-46 absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <Link
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href="/account"
                >
                  Аккаунт {session?.user?.email && `(${session?.user?.email})`}
                </Link>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleLogout}
                >
                  Выход
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
