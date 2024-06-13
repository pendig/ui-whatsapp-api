'use client';

import React, { useEffect, useState } from 'react';
import AddNewSession from './modal/add-new-session';
import { FadeLoader } from 'react-spinners';
import SessionCard from './session-card';

const AllSession = ({ isCreate = false }) => {
  const [sessions, setSessions] = React.useState([]) as any[];

  useEffect(() => {
    const stringSessions = localStorage.getItem('sessionName');
    if (stringSessions) {
      setSessions(JSON.parse(stringSessions));
    }
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <div className="md:col-span-4 lg:col-span-3">
        <div className="card aspect-square rounded-md p-5 shadow-lg">
          <div className="flex h-full w-full items-center justify-center">
            <AddNewSession isCreate={isCreate} />
          </div>
        </div>
      </div>
      {sessions && sessions.map((session: any, i: number) => <SessionCard session={session} key={i} />)}
    </div>
  );
};

export default AllSession;
