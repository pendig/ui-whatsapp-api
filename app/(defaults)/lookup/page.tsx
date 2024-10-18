'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import Link from 'next/link';
import Swal from 'sweetalert2';

const Lookup = () => {
  const [data, setData] = useState<any[]>([]);

  const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: 'toast' },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: '10px 20px',
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        showMessage('File yang diunggah bukan format CSV.', 'error');
        return;
      }
      Papa.parse(file, {
        complete: (results: { data: any[] }) => {
          setData(results.data);
        },
        header: true,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
  });

  const handleAction = (row: any) => {
    console.log('action');
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
        style={{ border: '2px dashed #cccccc', padding: '80px', textAlign: 'center' }}
      >
        {' '}
        <input {...getInputProps()} />
        <p>Seret dan lepas file di sini, atau klik untuk memilih file</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        {' '}
        <h3>Data dari file:</h3>
        {data.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} style={{ border: '1px solid #dddddd', padding: '8px' }}>
                    {key}
                  </th>
                ))}
                <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #dddddd', padding: '8px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, idx) => (
                    <td key={idx} style={{ border: '1px solid #dddddd', padding: '8px' }}>
                      {value}
                    </td>
                  ))}
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}></td>
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        {' '}
        <Link href="/template/upload-contact.csv" download className="text-sm text-blue-600 underline">
          Unduh Template CSV
        </Link>
      </div>
    </div>
  );
};

export default Lookup;
