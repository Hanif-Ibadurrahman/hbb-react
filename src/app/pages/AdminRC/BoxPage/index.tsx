import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DataTable from './DataTable';
import { Filter } from 'app/components/Filter';
import Breadcrumb from 'app/components/BreadCrumb';

export function AsignBoxPage() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'AsignBox']);
  return (
    <>
      <Helmet>
        <title>Asign Request Box</title>
        <meta name="description" content="Request Box" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="mb-4 d-flex jc-between">
          <Breadcrumb crumbs={crumbs} selected />
          <Filter />
        </div>
        <DataTable />
      </div>
    </>
  );
}
