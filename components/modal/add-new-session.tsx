'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import IconPlus from '../icon/icon-plus';
import { useRouter } from 'next/navigation';
import { createNewSession } from '@/actions/action';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import IconLoader from '../icon/icon-loader';

const AddNewSession = ({ isCreate = false }) => {
  const [modal, setModal] = useState(isCreate);
  const [sessionName, setSessionName] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk tombol save
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('sessionName')?.focus();
    }, 500);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true); // Set submitting true saat submit
    toast.dismiss();
    const loadingToast = toast.loading('Please wait...');

    const createNewSessionResponse = await createNewSession(sessionName, callbackUrl);

    if (!createNewSessionResponse.success) {
      setIsSubmitting(false); // Kembalikan tombol save menjadi tidak disabled
      toast.dismiss();
      toast.error(createNewSessionResponse?.error || 'This is an error!');
      if (createNewSessionResponse?.error === 'You are not authorized to perform this action') {
        await signOut();
      }
      return;
    }

    const existingSessionName = localStorage.getItem('sessionName');
    let sessionNameParsed = existingSessionName ? JSON.parse(existingSessionName) : [];

    sessionNameParsed = [...new Set([...sessionNameParsed, sessionName])];
    localStorage.setItem('sessionName', JSON.stringify(sessionNameParsed));

    toast.dismiss(loadingToast);
    toast.success('Successfully created a new session!');
    router.push('/session');
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
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                      }}
                      className="grid gap-5"
                    >
                      <div>
                        <label htmlFor="sessionName">Session Name</label>
                        <input
                          id="sessionName"
                          type="text"
                          placeholder="Enter Session Name"
                          className="form-input"
                          onChange={(event) => setSessionName(event.target.value)}
                          disabled={isSubmitting} // Disable input ketika sedang submit
                        />
                      </div>
                      <div>
                        <label htmlFor="callbackUrl">Callback URL</label>
                        <input
                          id="callbackUrl"
                          type="text"
                          placeholder="https://your-callback-url.com"
                          className="form-input"
                          onChange={(event) => setCallbackUrl(event.target.value)}
                          disabled={isSubmitting} // Disable input ketika sedang submit
                        />
                      </div>
                      <button className="hidden" type="submit"></button>
                    </form>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          router.push('/session');
                        }}
                        className="btn btn-outline-danger"
                        disabled={isSubmitting} // Disable tombol cancel saat submit
                      >
                        Discard
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await handleSubmit();
                        }}
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        disabled={isSubmitting} // Disable tombol save saat submit
                      >
                        {isSubmitting ? <IconLoader className="mr-3 h-5 w-5 animate-spin" /> : null} Save
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
