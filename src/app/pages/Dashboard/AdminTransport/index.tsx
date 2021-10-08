import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../dashboard.scoped.scss';
import { DataTable } from '../../../components/Datatables';
import { Button } from 'react-bootstrap';
import { Card, CardHeader } from '../Components/CardDashboard';

const body = Array.from(new Array(1), () => {
  const rd = (Math.random() * 10).toFixed(10);

  return {
    id: `A000000${rd}`,
    Tujuan: 'PT.Sanjaya Tech',
    TanggalRequest: '05 - 09 - 21',
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
    title: 'Tujuan',
    prop: 'Tujuan',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Tanggal Request',
    prop: 'TanggalRequest',
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
      style: { background: '#fafafa', width: '20%' },
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

export function DashboardAdminTransport() {
  return (
    <>
      <Helmet>
        <title>Dox - Dashboard Admin Transport</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <div className="pos-r p-8 bg-primary-5">
        <h3 className="tc-dark-contrast mb-12 ff-1-bd">
          <span className="ff-1">Selamat Datang,</span> Admin Transport
        </h3>
        <h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
        <div className="row w-100% mh-0 row-summary">
          <div className="col col-4 ph-0">
            <CardHeader
              icon="box-check"
              total="28"
              text={['Register', <br />, 'Baru.']}
            />
          </div>
          <div className="col col-4 ph-0 mh-4">
            <CardHeader
              icon="shipping-fast"
              total="64"
              text={['Ongoing', <br />, 'Package.']}
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
