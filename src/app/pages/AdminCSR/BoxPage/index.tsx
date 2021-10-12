import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DataTables from './DataTable';
import { Filter } from 'app/components/Filter';
import Breadcrumb from 'app/components/BreadCrumb';

export function ApprovalBoxPage() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'Approval Box']);
  return (
    <>
      <Helmet>
        <title>Approval Box</title>
        <meta name="description" content="Approval Box" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="mb-4 d-flex jc-between">
          <Breadcrumb crumbs={crumbs} selected />
          <Filter />
        </div>
        <DataTables />
      </div>
    </>
  );
}
