import { useEffect, useState } from 'react';
import NoCacheImage from './no-cache-image';
import { checkSessionStatus } from '@/actions/action';
import { IoLogoWhatsapp } from 'react-icons/io';
import { encryptText } from '@/lib/encryption';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { signOut } from 'next-auth/react';
import TerminateSessions from './modal/terminate-sessions';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArchiveBoxXMarkIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';

interface SessionCardProps {
  session: string;
  sessionData: any;
  isTerminate?: boolean;
  onTerminate?: () => void;
  onEditWebhook?: () => void;
}

const SessionCard = ({ session, onTerminate, isTerminate, sessionData, onEditWebhook }: SessionCardProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const encryptedSession = encryptText(session);

  useEffect(() => {
    const checkStatus = async () => {
      const response = await checkSessionStatus(session);

      if (response.error && response.error === 'You are not authorized to perform this action') {
        await signOut();
        return;
      }

      const state = response?.state;

      if (state === 'CONNECTED') {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };

    if (session) {
      checkStatus();
    }
  }, [session]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const openTerminateModal = () => {
    console.log('openTerminateModal');
    setIsShow(true);
  };

  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="card aspect-square rounded-lg border border-gray-200 bg-white pb-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="truncate rounded-tl-lg rounded-tr-lg bg-[#F9FAFB] p-3 font-bold text-black dark:bg-gray-700 dark:text-white">
          {session}
        </div>
        <div className="relative flex h-full w-full items-center justify-center">
          <NoCacheImage
            src={`${
              isConnected
                ? '/assets/images/dummy-qr-code-2.png'
                : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/session/qr/${session}/image?time=${new Date().getTime()}`
            }`}
            alt={`QR Code image for session ${session}`}
          />
          {isConnected && (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800/75">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 dark:bg-gray-800">
                <IoLogoWhatsapp className="text-5xl text-success dark:text-green-500" />
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 px-3 pt-3 text-xs text-black dark:text-white">
          <div className="flex items-center justify-start gap-2 pl-2 text-xs">
            <div className={`h-[10px] w-[10px] rounded-full bg-${isConnected ? 'success' : 'danger'}`}></div>
            <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
          </div>
          <div className="flex items-center justify-end">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 px-2 dark:text-white">
                <EllipsisHorizontalIcon className="size-4 fill-black dark:fill-white" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="z-50 w-60 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-black shadow-2xl transition duration-100 ease-out focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <MenuItem>
                  <Link
                    href={`/qr?code=${encryptedSession}`}
                    target="_blank"
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:hover:bg-gray-600"
                  >
                    <ArrowTopRightOnSquareIcon className="size-4 fill-black/30 dark:fill-white/30" />
                    QR Code URL
                  </Link>
                </MenuItem>
                <CopyToClipboard
                  text={`${process.env.NEXT_PUBLIC_APP_URL}/qr?code=${encryptedSession}`}
                  onCopy={() => setCopied(true)}
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:hover:bg-gray-600">
                      <Square2StackIcon className="size-4 fill-black/30 dark:fill-white/30" />
                      Copy QR Code URL
                    </button>
                  </MenuItem>
                </CopyToClipboard>
                <div className="my-1 h-px bg-black/5 dark:bg-gray-600" />
                <MenuItem>
                  <Link
                    href={sessionData.webhook_url}
                    target="_blank"
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:hover:bg-gray-600"
                  >
                    <ArrowTopRightOnSquareIcon className="size-4 fill-black/30 dark:fill-white/30" />
                    Webhook URL
                  </Link>
                </MenuItem>
                <CopyToClipboard text={sessionData.webhook_url} onCopy={() => setCopied(true)}>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:hover:bg-gray-600">
                      <Square2StackIcon className="size-4 fill-black/30 dark:fill-white/30" />
                      Copy Webhook URL
                    </button>
                  </MenuItem>
                </CopyToClipboard>
                <div className="my-1 h-px bg-black/5 dark:bg-gray-600" />
                <MenuItem>
                  <button
                    onClick={() => {
                      onEditWebhook && onEditWebhook();
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:hover:bg-gray-600"
                  >
                    <ArchiveBoxXMarkIcon className="size-4 fill-black/30 dark:fill-white/30" />
                    Edit Webhook
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={openTerminateModal}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red-400 dark:text-red-500 dark:hover:bg-gray-600"
                  >
                    <TrashIcon className="size-4 fill-red-400 dark:fill-red-500" />
                    Terminate
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {isShow ? (
        <>
          <TerminateSessions
            isShow={true}
            name={session}
            onCancel={() => {
              setIsShow(false);
            }}
            onTerminate={() => {
              onTerminate && onTerminate();
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default SessionCard;
