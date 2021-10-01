import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { LemariTables } from './LemariTables';
import Button from 'react-bootstrap/Button';
import { LemariForm } from './components/Lemariform';
import React, { useState } from 'react';

export function LemariPage() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Helmet>
        <title>Lemari Page</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            <i className="fas fa-plus"></i>Tambah
          </Button>
          <Button variant="info">Print</Button>
          <LemariForm show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <LemariTables />
      </div>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;
