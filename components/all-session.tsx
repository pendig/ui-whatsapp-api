'use client';

import React, { useEffect, useState } from 'react';
import AddNewSession from './modal/add-new-session';
import EditWebhookUrl from './modal/edit-webhook-url';
import SessionCard from './session-card';
import { FadeLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { fetchSessions } from '@/actions/action';

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

    console.log({ sessionResponse });

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
      <div className="md:col-span-4 lg:col-span-3">
        <div className="card aspect-square rounded-md p-5 shadow-lg">
          <div className="flex h-full w-full items-center justify-center">
            <AddNewSession isCreate={isCreate} />
          </div>
        </div>
      </div>
      {sessions &&
        sessions.length &&
        sessions.map((session: any, i: any) => (
          <div key={session.id} className="md:col-span-4 lg:col-span-3">
            <SessionCard session={session.name} />
            <div className="w-full">
              <div className="flex justify-center">
                <button className="btn btn-warning btn-sm mt-0" onClick={() => handleEditWebhook(session)}>
                  Edit Webhook URL
                </button>
              </div>
            </div>
          </div>
        ))}
      {isEditModalOpen && selectedSession && (
        <EditWebhookUrl
          sessionName={selectedSession.name}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllSession;
