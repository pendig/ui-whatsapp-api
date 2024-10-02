'use client';
import React, { useState, useEffect } from 'react';

const ComponentsAppsTemplate = () => {
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [value, setValue] = useState<any>('list');
  const [defaultParams] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    role: '',
    location: '',
  });

  const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

  const changeValue = (e: any) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const [search, setSearch] = useState<any>('');
  const [contactList] = useState<any>([
    {
      id: 1,
      templateName: 'Kirim OTP',
      templateText:
        'Terima kasih telah melakukan registrasi. Berikut adalah kode OTP Anda: 123456. Kode ini hanya berlaku selama 5 menit. Jangan berikan kode ini kepada siapa pun demi menjaga keamanan akun Anda.',
    },
    {
      id: 2,
      templateName: 'Penawaran Harga',
      templateText:
        'Halo, Kami sangat senang untuk menginformasikan bahwa Anda memenuhi syarat untuk mendapatkan penawaran khusus. Harga khusus ini hanya berlaku selama 7 hari ke depan. Segera hubungi kami untuk mendiskusikan lebih lanjut mengenai penawaran ini dan jangan lewatkan kesempatan terbaik ini!',
    },
    {
      id: 3,
      templateName: 'Pemberitahuan Jadwal',
      templateText:
        'Pelanggan yang terhormat, kami ingin mengingatkan Anda tentang jadwal pertemuan Anda dengan tim kami pada hari Rabu, 10 Oktober 2024, pukul 10.00 pagi. Pertemuan akan dilakukan secara virtual melalui platform Zoom. Mohon untuk hadir tepat waktu dan siapkan dokumen yang diperlukan.',
    },
    {
      id: 4,
      templateName: 'Reminder Pembayaran',
      templateText:
        'Kami ingin mengingatkan Anda bahwa batas waktu pembayaran tagihan Anda akan segera berakhir pada tanggal 15 Oktober 2024. Segera lakukan pembayaran untuk menghindari denda keterlambatan. Terima kasih atas perhatian dan kerja samanya.',
    },
  ]);

  const [filteredItems, setFilteredItems] = useState<any>(contactList);

  const searchContact = () => {
    setFilteredItems(() => {
      return contactList.filter((item: any) => {
        return item.templateName.toLowerCase().includes(search.toLowerCase());
      });
    });
  };

  useEffect(() => {
    searchContact();
  }, [search]);

  const saveUser = () => {
    // Logika penyimpanan user (tidak diubah)
  };

  const editUser = (user: any = null) => {
    const json = JSON.parse(JSON.stringify(defaultParams));
    setParams(json);
    if (user) {
      let json1 = JSON.parse(JSON.stringify(user));
      setParams(json1);
    }
    setAddContactModal(true);
  };

  const deleteUser = (user: any = null) => {
    setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">Message Template</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Templates"
              className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="panel mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <table className="table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Template Text</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((contact: any, index: number) => {
                return (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.templateName}</td>
                    <td>{contact.templateText}</td>
                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editUser(contact)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(contact)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsTemplate;
