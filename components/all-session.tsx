import React from 'react';
import QRCode from 'react-qr-code';
import AddNewSession from './add-new-session';

const AllSession = ({ isCreate = false }) => {
  return (
    <div className="grid gap-5 md:grid-cols-12">
      <div className="md:col-span-4 lg:col-span-3">
        <div className="card aspect-square rounded-md p-5 shadow-lg">
          <div className="flex h-full w-full items-center justify-center">
            <AddNewSession isCreate={isCreate} />
          </div>
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="md:col-span-4 lg:col-span-3" key={i}>
          <div className="card aspect-square rounded-md p-5 shadow-lg">
            <div className="flex h-full w-full items-center justify-center">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={'https://www.google.com'}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          <div className="px-3 pt-3 text-center font-bold">Session Name</div>
        </div>
      ))}
    </div>
  );
};

export default AllSession;
