'use client';
import NoCacheImage from '@/components/no-cache-image';
import { decryptText } from '@/lib/encryption';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PublicQRCodePage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [dec, setDec] = useState('');

  useEffect(() => {
    const d = decryptText(code ? code.replace(/ /g, '+') : '');
    setDec(d);
  }, [code]);

  return (
    <div className="mt-20 flex justify-center">
      {dec ? (
        <div>
          <h1 className="mb-5 text-center text-3xl font-bold">Session: {dec}</h1>
          <NoCacheImage
            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/session/qr/${dec}/image?time=${new Date().getTime()}`}
            alt={`QR Code image for session ${dec}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PublicQRCodePage;
