'use client';

import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import IconTrash from './icon/icon-trash';
import { useRouter } from 'next/navigation';
import TerminateAllSession from './modal/terminate-all-session';

interface NoCacheImageProps {
  src: string;
  alt: string;
}

const NoCacheImage: React.FC<NoCacheImageProps> = ({ src, alt }) => {
  const [uniqueSrc, setUniqueSrc] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const updateImageSrc = () => {
      setUniqueSrc(`${src}?time=${new Date().getTime()}`);
      setHasError(false);
    };

    const intervalId = setInterval(updateImageSrc, 1000);

    updateImageSrc();

    return () => clearInterval(intervalId);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div>
      {!hasError ? (
        <img src={uniqueSrc} alt={alt} onError={handleError} />
      ) : (
        <FadeLoader color="#36d7b7" loading={true} aria-label="Loading Spinner" data-testid="loader" />
      )}
    </div>
  );
};

const TerminateSession = ({ isShow = false }) => {
  const [sessions, setSessions] = React.useState([]) as any[];
  const router = useRouter();

  useEffect(() => {
    const stringSessions = localStorage.getItem('sessionName');
    if (stringSessions) {
      setSessions(JSON.parse(stringSessions));
    }
  }, []);

  return (
    <>
      <div className="mb-5 flex justify-end">
        <button
          className="btn btn-danger"
          onClick={() => {
            router.push('/session/terminate/all');
          }}
        >
          Terminate All Session
        </button>
      </div>
      <TerminateAllSession isShow={isShow} />
      <div className="grid gap-5 md:grid-cols-12">
        {sessions &&
          sessions.map((session: any, i: number) => (
            <div className="md:col-span-4 lg:col-span-3" key={i}>
              <div className="card aspect-square rounded-md shadow-lg">
                <div className="flex h-full w-full items-center justify-center">
                  <NoCacheImage
                    src={`${
                      process.env.NEXT_PUBLIC_API_ENDPOINT
                    }/session/qr/${session}/image?time=${new Date().getTime()}`}
                    alt="Deskripsi Gambar"
                  />
                </div>
              </div>
              <div className="px-3 pt-3 text-center font-bold">{session}</div>
              <div className="my-3 flex items-center justify-center">
                <button className="btn btn-danger btn-sm">
                  <IconTrash className="mr-2 h-4 w-4" />
                  Terminate
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TerminateSession;
