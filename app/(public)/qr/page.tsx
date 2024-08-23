'use client';

import { checkSessionStatus } from '@/actions/action';
import NoCacheImage from '@/components/no-cache-image';
import { decryptText } from '@/lib/encryption';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PublicQRCodePage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const dec = decryptText(code ? code.replace(/ /g, '+') : '');

  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const response = await checkSessionStatus(dec);

      if (response.error && response.error === 'You are not authorized to perform this action') {
        await signOut();
        return;
      }

      const state = response?.state;

      setIsConnected(state === 'CONNECTED');
      setIsChecking(false);
    };

    if (code && dec) {
      checkStatus();
    } else {
      setIsChecking(false);
    }
  }, [code, dec]);

  if (isChecking) {
    return <div className="mt-20 flex justify-center">Loading...</div>;
  }

  return (
    <div className="mt-20 flex justify-center">
      {dec ? (
        <div>
          <h1 className="mb-5 text-center text-3xl font-bold">Session: {dec}</h1>
          <NoCacheImage
            src={`${
              isConnected
                ? '/assets/images/dummy-qr-code-2.png'
                : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/session/qr/${dec}/image?time=${new Date().getTime()}`
            }`}
            alt={`QR Code image for session ${dec}`}
          />
        </div>
      ) : (
        <div>
          <h1 className="mb-5 text-center text-3xl font-bold">Session Not Found!</h1>
        </div>
      )}
    </div>
  );
};

export default PublicQRCodePage;
