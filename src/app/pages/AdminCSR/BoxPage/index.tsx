import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataTables } from './DataTable';
import Button from 'react-bootstrap/Button';

export function ApprovalBoxPage() {
  return (
    <>
      <Helmet>
        <title>Approval Request Box</title>
        <meta name="description" content="Request Box" />
      </Helmet>
      <div className="pos-r p-8">
        <DataTables />
      </div>
    </>
  );
}
