'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { terminateAllSession } from '@/actions/action';
import toast, { Toaster } from 'react-hot-toast';

const TerminateAllSession = ({ isShow = false }) => {
  const [modal, setModal] = useState(isShow);

  const router = useRouter();

  const handleSubmit = async () => {
    const response = await terminateAllSession();

    if (!response.success) {
      toast.error(response.error || 'This is an error!');
      return;
    }

    localStorage.removeItem('sessionName');

    router.push('/session');
    toast.success('Successfully terminate all session!');
    return;
  };
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          open={modal}
          onClose={() => {
            router.push('/session/terminate');
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
            <div className="flex min-h-screen items-start justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <div className="text-lg font-bold">Confirmation!</div>
                    <button
                      type="button"
                      onClick={() => setModal(false)}
                      className="text-white-dark hover:text-dark"
                    ></button>
                  </div>
                  <div className="p-5">
                    <p>Are you sure to terminate all session?</p>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          router.push('/session/terminate');
                        }}
                        className="btn btn-outline-danger"
                      >
                        No, Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await handleSubmit();
                        }}
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      >
                        Yes, Terminate All
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TerminateAllSession;
