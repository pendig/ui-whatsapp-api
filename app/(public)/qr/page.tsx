'use client';

import { checkSessionStatus } from '@/actions/action';
import NoCacheImage from '@/components/no-cache-image';
import { decryptText } from '@/lib/encryption';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PublicQRCodePage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const dec = decryptText(code ? code.replace(/ /g, '+') : '');

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log({ code, dec });
    const checkStatus = async () => {
      const response = await checkSessionStatus(dec);

      const state = response?.state;

      if (state === 'CONNECTED') {
        setIsConnected(true);
        return;
      } else {
        setIsConnected(false);
      }
    };

    if (code && dec) {
      checkStatus();
    }
  }, [code, dec]);

  return (
    <div className="mt-20 flex justify-center">
      {/* <div>Code: {code}</div>
      <div>Enc: {enc}</div>
      <div>Dec: {dec}</div> */}
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
