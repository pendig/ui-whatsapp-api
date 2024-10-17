'use client';
import { useEffect, useState } from 'react';
import AddNewSession from './modal/add-new-session';
import EditWebhookUrl from './modal/edit-webhook-url';
import SessionCard from './session-card';
import { signOut, useSession } from 'next-auth/react';
import { fetchSessions } from '@/actions/action';
import toast from 'react-hot-toast';

interface AllSessionProps {
  isCreate?: boolean;
}

interface Session {
  id: number;
  name: string;
  webhook_url: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const AllSession = ({ isCreate = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<any>();

  const { data: session }: any = useSession();

  const fetchSession = async () => {
    const sessionResponse: any = await fetchSessions();

    if (!sessionResponse.success) {
      toast.dismiss();
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

  const handleEditWebhook = (session: Session) => {
    setSelectedSession(session);
    setIsEditModalOpen(true);
  };

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <div className="h-full md:col-span-4 lg:col-span-3">
        <div className="card h-full rounded-md border p-5 dark:border-gray-700">
          <div className="flex h-full w-full items-center justify-center">
            <AddNewSession isCreate={isCreate} />
          </div>
        </div>
      </div>
      {sessions && sessions.length ? (
        <>
          {sessions.map((session: any, i: any) => (
            <div key={session.id} className="md:col-span-4 lg:col-span-3">
              <SessionCard
                session={session.name}
                sessionData={session}
                onEditWebhook={() => handleEditWebhook(session)}
                onTerminate={fetchSession}
              />
              {/* <div className="w-full">
                <div className="flex justify-center">
                  <button className="btn btn-warning btn-sm mt-0" onClick={() => handleEditWebhook(session)}>
                    Edit Webhook URL
                  </button>
                </div>
              </div> */}
            </div>
          ))}
        </>
      ) : null}
      {isEditModalOpen && selectedSession && (
        <EditWebhookUrl
          sessionName={selectedSession.name}
          existingWebhookUrl={selectedSession.webhook_url}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllSession;
