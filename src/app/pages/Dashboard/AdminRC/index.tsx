import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../dashboard.scoped.scss';
import { DataTable } from '../Components/Datatables';
import { Button } from 'react-bootstrap';
import { Card, CardHeader } from '../Components/CardDashboard';

const body = Array.from(new Array(1), () => {
  const rd = (Math.random() * 10).toFixed(10);

  return {
    id: `A000000${rd}`,
    NamaPerusahaan: '05 - 09 - 21',
    NamaPeminjaman: '09:52 WIB',
    JumlahBox: '10',
    Action: <Button>Lihat</Button>,
  };
});

const header = [
  {
    title: 'Id',
    prop: 'id',
    sortable: true,
    cellProps: {
      style: { width: '25%' },
    },
  },
  {
    title: 'Nama Perusahaan',
    prop: 'NamaPerusahaan',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Nama Peminjaman',
    prop: 'NamaPeminjaman',
    sortable: true,
    cellProps: {
      style: { width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Jumlah Box',
    prop: 'JumlahBox',
    sortable: true,
    cellProps: {
      style: { width: '20%', background: '#fafafa' },
    },
  },
  {
    title: 'Action',
    prop: 'Action',
    cellProps: {
      style: { flex: 1 },
      className: 'realname-class',
    },
  },
];

export function DashboardAdminRC() {
  return (
    <>
      <Helmet>
        <title>Dox - Dashboard RC</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <div className="pos-r p-8 bg-primary-5">
        <h3 className="tc-dark-contrast mb-12 ff-1-bd">
          <span className="ff-1">Selamat Datang,</span> Admin RC
        </h3>
        <h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
        <div className="row w-100% mh-0 row-summary">
          <div className="col col-4 ph-0">
            <CardHeader
              icon="archive"
              total="28"
              text={['Entry', <br />, 'Baru.']}
            />
          </div>
          <div className="col col-4 ph-0 mh-4">
            <CardHeader
              icon="shipping-fast"
              total="94"
              text={['Ongoing', <br />, ' package.']}
            />
          </div>
          <div className="col col-4 ph-0 mh-4">
            <CardHeader
              icon="vote-nay"
              total="14"
              text={['Issued', <br />, ' package.']}
            />
          </div>
        </div>
      </div>
      <div className="pos-r p-8 pt-0 mt-20">
        <h6 className="mb-3 pt-3">Today's Notifications.</h6>
        <div className="row w-100% mh-0">
          <div className="col col-12 ph-0 mr-2">
            <Card style={{ border: '1px solid rgba(0,0,0,.05)' }}>
              <DataTable tableHeader={header} tableBody={body} />
            </Card>
          </div>
          {/* <div className="col col-4 ph-0 ml-2">
            <Card style={{ border: '1px solid rgba(0,0,0,.05)' }}></Card>
          </div> */}
        </div>
      </div>
    </>
  );
}
