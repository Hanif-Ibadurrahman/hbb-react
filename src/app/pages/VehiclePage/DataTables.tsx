import * as React from 'react';
import Datatable from 'react-bs-datatable';
import { Button } from 'react-bootstrap';

// Create table headers consisting of 4 columns.
export const header = [
  {
    title: 'Nomor Polisi',
    prop: 'NoPolisi',
    sortable: true,
    cellProps: {
      style: { width: '20%' },
    },
  },
  {
    title: 'Jenis',
    prop: 'JenisKendaraan',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '15%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Merk',
    prop: 'MerkKendaraan',
    sortable: true,
    cellProps: {
      style: { width: '20%' },
    },
  },
  {
    title: 'Warna',
    prop: 'WarnaKendaraan',
    cellProps: {
      style: { background: '#fafafa', width: '15%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Muatan',
    prop: 'MaksMuatan',
    sortable: true,
    cellProps: {
      style: { width: '15%' },
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

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return 'Do MMMM YYYY'.valueOf();
  },
};

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.

export function DataTables() {
  const body = Array.from(new Array(30), () => {
    const rd = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);

    return {
      NoPolisi: `F1232${rd}`,
      JenisKendaraan: 'SUV',
      MerkKendaraan: 'Suzuki',
      WarnaKendaraan: 'Putih',
      MaksMuatan: '10KG',

      Action: (
        <Button
          variant="dark"
          className="w-24"
          onClick={() => {
            window.location.pathname = 'Vehicle/EditVehicle';
          }}
        >
          Edit
        </Button>
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
          onSort={onSortFunction}
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
