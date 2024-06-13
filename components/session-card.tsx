import { useEffect, useState } from 'react';
import IconTrash from './icon/icon-trash';
import NoCacheImage from './no-cache-image';
import { checkSessionStatus } from '@/actions/action';
import { IoLogoWhatsapp } from 'react-icons/io';

interface SessionCardProps {
  session: string;
  handleTerminate: (sessionName: string) => void;
}

const SessionCard = ({ session, handleTerminate }: SessionCardProps) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      console.log('Checking status');
      const response = await checkSessionStatus(session);

      const state = response?.state;

      if (state === 'CONNECTED') {
        setIsConnected(true);
        return;
      } else {
        setIsConnected(false);
      }
    };

    if (session) {
      checkStatus();
    }
  }, [session]);

  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="card aspect-square rounded-md shadow-lg">
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
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-white/75">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3">
                <IoLogoWhatsapp className="text-5xl text-success" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-3">
        <div className="mt-3 flex-1 font-bold">{session}</div>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <div className={`h-[10px] w-[10px] rounded-full bg-${isConnected ? 'success' : 'danger'}`}></div>
          <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
        </div>
      </div>
      {handleTerminate && (
        <div className="my-3 flex items-center justify-center">
          <button className="btn btn-danger btn-sm" onClick={() => handleTerminate(session)}>
            <IconTrash className="mr-2 h-4 w-4" />
            Terminate
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
