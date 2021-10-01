import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { DivisiTables } from './DivisiTables';
import Button from 'react-bootstrap/Button';
import { ModalDivisi } from './components/Modaldivisi';
import React, { useState } from 'react';

export function DivisiPage() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Helmet>
        <title>Divisi Page</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            <i className="fas fa-plus"></i>Tambah
          </Button>
          <ModalDivisi show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <DivisiTables />
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
