'use client';

import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import IconTrash from './icon/icon-trash';
import { useRouter } from 'next/navigation';
import TerminateAllSession from './modal/terminate-all-session';
import toast from 'react-hot-toast';
import { fetchSessions, terminateSession } from '@/actions/action';
import SessionCard from './session-card';
import { signOut, useSession } from 'next-auth/react';

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
  const [sessions, setSessions] = useState<any>();
  const router = useRouter();

  const { data: session }: any = useSession();

  const fetchSession = async () => {
    const sessionResponse: any = await fetchSessions();

    if (!sessionResponse.success) {
      toast.error(sessionResponse?.error || 'Failed to fetch sessions');
      if (sessionResponse?.error === 'You are not authorized to perform this action') {
        await signOut();
      }
      return;
    }

    setSessions(sessionResponse?.sessions);
  };

  useEffect(() => {
    fetchSession();
  }, [session]);

  return (
    <>
      <div className="mb-5 flex justify-end">
        <button
          className="btn btn-danger"
          onClick={() => {
            router.push('/session/terminate/all');
          }}
          disabled={!sessions || !sessions.length}
        >
          Terminate All Session
        </button>
      </div>
      <TerminateAllSession isShow={isShow} />
      <div className="grid gap-5 md:grid-cols-12">
        {sessions && sessions.length ? (
          <>
            {sessions.map((session: any, i: any) => (
              <div key={session.id} className="md:col-span-4 lg:col-span-3">
                <SessionCard session={session.name} key={i} isTerminate />
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default TerminateSession;
