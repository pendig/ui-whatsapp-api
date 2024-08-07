'use client';

import React, { useEffect, useState } from 'react';
import AddNewSession from './modal/add-new-session';
import EditWebhookUrl from './modal/edit-webhook-url';
import { FadeLoader } from 'react-spinners';
import SessionCard from './session-card';

interface AllSessionProps {
  isCreate?: boolean;
}

const AllSession: React.FC<AllSessionProps> = ({ isCreate = false }) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    const stringSessions = localStorage.getItem('sessionName');
    if (stringSessions) {
      setSessions(JSON.parse(stringSessions));
    }
  }, []);

  const handleEditWebhook = (sessionName: string) => {
    setSelectedSession(sessionName);
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
        sessions.map((session, i) => (
          <div key={i} className="md:col-span-4 lg:col-span-3">
            <SessionCard session={session} />
            <button onClick={() => handleEditWebhook(session)}>Edit Webhook URL</button>
          </div>
        ))}
      {isEditModalOpen && selectedSession && (
        <EditWebhookUrl
          sessionName={selectedSession}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllSession;
