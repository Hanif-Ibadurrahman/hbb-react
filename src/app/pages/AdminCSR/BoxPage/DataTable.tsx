import React, { useState } from 'react';
// import styled from 'styled-components/macro';
// import { StyleConstants } from 'styles/StyleConstants';
import Datatable from 'react-bs-datatable';
import Button from 'react-bootstrap/Button';
import { ModalForm } from './components/ModalForm';
import { BrowserRouter } from 'react-router-dom';

// Create table headers consisting of 4 columns.

export const header = [
  {
    title: 'Code Box',
    prop: 'CodeBox',
    sortable: true,
    cellProps: {
      style: { width: '15%' },
    },
  },
  {
    title: 'Tanggal',
    prop: 'Tanggal',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '15%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Waktu',
    prop: 'Waktu',
    cellProps: {
      style: { width: '15%' },
    },
  },
  {
    title: 'Quantity',
    prop: 'Quantity',
    cellProps: {
      style: { background: '#fafafa', width: '10%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Notes',
    prop: 'Notes',
    cellProps: {
      style: { width: '25%' },
    },
  },
  {
    title: 'Action',
    prop: 'Action',
    cellProps: {
      style: { background: '#fafafa' },
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

export default function DataTable() {
  const [modalShow, setModalShow] = useState(false);

  const body = Array.from(new Array(20), () => {
    const rd = (Math.random() * 10).toFixed(2);

    if (rd > '5') {
      return {
        CodeBox: `A1232${rd}`,
        Tanggal: '05 - 09 - 21',
        Waktu: '09:52 WIB',
        Quantity: '10',
        Notes: (
          <span className="notes">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </span>
        ),
        Action: (
          <div className="d-flex jc-between">
            <Button variant="dark" className="" href="/DetailBoxCSR">
              Detail
            </Button>
            <Button
              variant="transparant"
              className="tc-success-5 w-24"
              disabled
            >
              Success
            </Button>
          </div>
        ),
      };
    } else if (rd > '3') {
      return {
        CodeBox: `A1232${rd}`,
        Tanggal: '05 - 09 - 21',
        Waktu: '09:52 WIB',
        Quantity: '10',
        Notes: (
          <span className="notes">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </span>
        ),
        Action: (
          <div className="d-flex jc-between">
            <Button variant="dark" className="" href="/DetailBoxCSR">
              Detail
            </Button>
            <Button variant="transparant" className="tc-danger-6 w-24" disabled>
              Cancel
            </Button>
          </div>
        ),
      };
    }

    return {
      CodeBox: `B2114${rd}`,
      Tanggal: '06 - 09 - 21',
      Waktu: '09:52 WIB',
      Quantity: '15',
      Notes: (
        <span className="notes">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </span>
      ),
      Action: (
        <div className="d-flex jc-between">
          <Button variant="dark" className="" href="/DetailBoxCSR">
            Detail
          </Button>
          <ModalForm />
        </div>
      ),
    };
  });

  return (
    <>
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
