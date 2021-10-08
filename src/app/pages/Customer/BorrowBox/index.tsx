import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTables } from './DataTables';
import { Header } from './Header';
import './page.scoped.scss';

export function BorrowBoxPage() {
  return (
    <>
      <Helmet>
        <title>Dox - Login</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <div className="pos-r p-8">
        <Header />
        <DataTables />
      </div>
    </>
  );
}
