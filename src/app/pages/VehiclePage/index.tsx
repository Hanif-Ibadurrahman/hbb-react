import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTables } from './DataTables';
import { Header } from './Header';
// import { SuccessAllert } from 'app/components/Alerts';

export function VehiclePage() {
  return (
    <>
      <Helmet>
        <title>Request Box</title>
        <meta name="description" content="Request Box" />
      </Helmet>
      <div className="pos-r p-8">
        <Header />
        <DataTables />
      </div>
    </>
  );
}
