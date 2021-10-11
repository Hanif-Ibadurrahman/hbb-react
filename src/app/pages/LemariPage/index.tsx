import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { LemariTables } from './DataTables';
import Button from 'react-bootstrap/Button';
// import { LemariForm } from './components/Lemariform';
import React, { useState } from 'react';
import Breadcrumb from 'app/components/BreadCrumb';
import { ModalLemari } from './components/ModalLemari';

export function LemariPage() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'LemariPage']);

  return (
    <>
      <Helmet>
        <title>Lemari Page</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="d-flex jc-between ai-center mb-4">
          <Breadcrumb crumbs={crumbs} selected />
          <div className="d-flex">
            <ModalLemari />
            <Button className="ml-2 d-flex ai-center" variant="dark">
              Print<i className="fas fa-print ml-2"></i>
            </Button>
          </div>
        </div>
        <LemariTables />
      </div>
    </>
  );
}
