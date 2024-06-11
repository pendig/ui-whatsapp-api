'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import IconPlus from '../icon/icon-plus';
import { useRouter } from 'next/navigation';
import { createNewSession } from '@/actions/action';
import axios from 'axios';

const AddNewSession = ({ isCreate = false }) => {
  const [modal, setModal] = useState(isCreate);
  const [sessionName, setSessionName] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    const createNewSessionResponse = await createNewSession(sessionName);

    if (!createNewSessionResponse.success) {
      alert('Failed to create a new session');
      return;
    }

    const existingSessionName = localStorage.getItem('sessionName');
    if (existingSessionName) {
      const sessionNameParsed = JSON.parse(existingSessionName);
      sessionNameParsed.push(sessionName);

      const uniqueSessionName = [...new Set(sessionNameParsed)];
      localStorage.setItem('sessionName', JSON.stringify(uniqueSessionName));
      router.push('/session');
    } else {
      localStorage.setItem('sessionName', JSON.stringify([sessionName]));
      router.push('/session');
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push('/session/create');
        }}
      >
        <IconPlus className="h-6 w-6" />
        Add New Session
      </button>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          open={modal}
          onClose={() => {
            router.push('/session/create');
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
                    <div className="text-lg font-bold">Add New Session</div>
                    <button
                      type="button"
                      onClick={() => setModal(false)}
                      className="text-white-dark hover:text-dark"
                    ></button>
                  </div>
                  <div className="p-5">
                    <p>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await handleSubmit();
                        }}
                      >
                        <label htmlFor="sessionName">Session Name</label>
                        <input
                          id="sessionName"
                          type="text"
                          placeholder="Enter Session Name"
                          className="form-input"
                          onChange={(event) => setSessionName(event.target.value)}
                        />
                      </form>
                    </p>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          router.push('/session');
                        }}
                        className="btn btn-outline-danger"
                      >
                        Discard
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await handleSubmit();
                        }}
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddNewSession;
