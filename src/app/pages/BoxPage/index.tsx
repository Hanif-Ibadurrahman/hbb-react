import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DataTables from './DataTables';
import { Header } from './Header';

export function BoxPage() {
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
