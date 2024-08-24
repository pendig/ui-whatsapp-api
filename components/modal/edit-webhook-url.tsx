'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { editWebhookUrl } from '@/actions/action';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

interface EditWebhookUrlProps {
  sessionName: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditWebhookUrl: React.FC<EditWebhookUrlProps> = ({ sessionName, isOpen, onClose }) => {
  const [newCallbackUrl, setNewCallbackUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    toast.dismiss();
    const loadingToast = toast.loading('Updating...');
    const editWebhookResponse = await editWebhookUrl(sessionName, newCallbackUrl);

    if (!editWebhookResponse.success) {
      toast.dismiss();
      toast.error(editWebhookResponse?.error || 'This is an error!');
      if (editWebhookResponse?.error === 'You are not authorized to perform this action') {
        await signOut();
      }
      return;
    }

    toast.dismiss(loadingToast);
    toast.success('Successfully updated the webhook URL!');
    onClose();
    router.refresh(); // Refresh the page by pushing the current path
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={onClose}>
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
                  <div className="text-lg font-bold">Edit Webhook URL</div>
                  <button type="button" onClick={onClose} className="text-white-dark hover:text-dark"></button>
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
                      <label htmlFor="newCallbackUrl">New Callback URL</label>
                      <input
                        id="newCallbackUrl"
                        type="text"
                        placeholder="https://your-new-callback-url.com"
                        className="form-input"
                        onChange={(event) => setNewCallbackUrl(event.target.value)}
                      />
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                      <button type="button" onClick={onClose} className="btn btn-outline-danger">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditWebhookUrl;
