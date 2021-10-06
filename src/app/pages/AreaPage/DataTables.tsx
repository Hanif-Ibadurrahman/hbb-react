// import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
// import { StyleConstants } from 'styles/StyleConstants';
import Datatable from 'react-bs-datatable';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ModalHapus } from './components/Modalhapus';
import React, { useState } from 'react';

// Create table headers consisting of 4 columns.
export const header = [
  {
    title: 'Nama Record Center',
    prop: 'RecordCenter',
    sortable: true,
    cellProps: {
      style: { width: '50%' },
    },
  },
  {
    title: 'Action',
    prop: 'Action',
    cellProps: {
      style: { width: '50%', background: '#fafafa' },
      className: 'realname-class',
    },
  },
];

export const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display',
  entries: 'rows',
  noResults: 'There is no data to be displayed',
};

export const classes = {
  table: 'table-striped table-hover mb-5',
  thead: `bg-primary-5 ta-center`,
  theadCol: `mt-5 pb-3 pt-3 p-lg`,
  tbodyRow: `h-10 p-md ta-center`,
  filterCol: `d-none`,
  controlRow: `jc-end`,
  paginationOptsFormControl: `w-auto cur-p`,
  paginationOptsFormGroup: `d-flex ai-center jc-center`,
  paginationCol: `w-auto`,
  paginationButton: `bg-dark bd-c-dark`,
};

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.

export function DataTables() {
  const [modalShow, setModalShow] = useState(false);

  const body = Array.from(new Array(30), () => {
    return {
      RecordCenter: `RC Bogor`,
      Action: (
        <ButtonGroup>
          <Button variant="light">
            Edit<i className="fas fa-edit ml-2"></i>
          </Button>
          <Button variant="danger" onClick={() => setModalShow(true)}>
            Hapus<i className="fas fa-trash-alt ml-2"></i>
          </Button>
        </ButtonGroup>
      ),
    };
  });

  return (
    <>
      <ModalHapus show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex fd-col-r">
        <Datatable
          tableHeaders={header}
          tableBody={body}
          rowsPerPage={8}
          rowsPerPageOption={[5, 10, 15, 20]}
          initialSort={{ prop: 'username', isAscending: true }}
          labels={customLabels}
          classes={classes}
        />
      </div>
    </>
  );
}

// const Wrapper = styled.div`
//   height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   min-height: 320px;
// `;
