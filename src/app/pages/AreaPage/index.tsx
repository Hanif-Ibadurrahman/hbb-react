import { Helmet } from 'react-helmet-async';
import { DataTables } from './DataTable';
import { ModalForm } from './components/Modalform';
import React, { useState } from 'react';
import Breadcrumb from 'app/components/BreadCrumb';

export function AreaPage() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'AreaPage']);

  return (
    <>
      <Helmet>
        <title>Area Page</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="d-flex jc-between ai-center mb-4">
          <Breadcrumb crumbs={crumbs} selected />
          <ModalForm />
        </div>
        <DataTables />
      </div>
    </>
  );
}
