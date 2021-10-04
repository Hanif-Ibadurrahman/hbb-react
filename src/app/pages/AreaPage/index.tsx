import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { DataTables } from './DataTables';
import Button from 'react-bootstrap/Button';
import { ModalForm } from './components/Modalform';
import React, { useState } from 'react';

export function AreaPage() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Helmet>
        <title>Area Page</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            <i className="fas fa-plus"></i>Tambah
          </Button>
          <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <DataTables />
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
