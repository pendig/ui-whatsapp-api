'use client';
import React, { useState, useEffect } from 'react';

const ComponentsAppsBlasting = () => {
  const [search, setSearch] = useState<any>('');
  const [contactList] = useState<any>([
    {
      id: 1,
      name: 'OTP Campaign',
      template: 'Kirim OTP',
      contactName: 'New Customers',
      numberOfContacts: 1500,
      status: 'Active',
      messagesSent: 1400,
    },
    {
      id: 2,
      name: 'Price Offer Campaign',
      template: 'Penawaran Harga',
      contactName: 'Prospective Customers',
      numberOfContacts: 3500,
      status: 'Inactive',
      messagesSent: 0,
    },
    {
      id: 3,
      name: 'Schedule Notification Campaign',
      template: 'Pemberitahuan Jadwal',
      contactName: 'Existing Customers',
      numberOfContacts: 2800,
      status: 'Active',
      messagesSent: 2750,
    },
    {
      id: 4,
      name: 'Payment Reminder Campaign',
      template: 'Reminder Pembayaran',
      contactName: 'Prospective Customers',
      numberOfContacts: 4500,
      status: 'Active',
      messagesSent: 4300,
    },
  ]);

  const [filteredItems, setFilteredItems] = useState<any>(contactList);

  const searchContact = () => {
    setFilteredItems(() => {
      return contactList.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    });
  };

  useEffect(() => {
    searchContact();
  }, [search]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const editUser = (user: any = null) => {
    // Edit logic
  };

  const deleteUser = (user: any = null) => {
    setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">Tabel Blasting</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Blasting"
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
                <th>Template</th>
                <th>Contact Name</th>
                <th>Number of Contacts</th>
                <th>Status</th>
                <th>Messages Sent</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((contact: any, index: number) => {
                return (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.template}</td>
                    <td>{contact.contactName}</td>
                    <td>{formatNumber(contact.numberOfContacts)}</td>
                    <td>{contact.status}</td>
                    <td>{formatNumber(contact.messagesSent)}</td>
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

export default ComponentsAppsBlasting;
