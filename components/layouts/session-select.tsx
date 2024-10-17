'use client';

import { fetchSessions } from '@/actions/action';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function SessionSelect() {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

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

  useEffect(() => {
    console.log({ sessions });
  }, [sessions]);

  return (
    <div className="w-52">
      <Select
        defaultValue={selectedOption}
        onChange={(newValue) => setSelectedOption(newValue)}
        options={options}
        placeholder="Select session"
      />
    </div>
  );
}
