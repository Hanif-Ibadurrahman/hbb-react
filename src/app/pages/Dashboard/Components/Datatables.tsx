import * as React from 'react';
import Datatable from 'react-bs-datatable';
import { Button } from 'react-bootstrap';

// Create table headers consisting of 4 columns.
export const header = [
  {
    title: 'Id',
    prop: 'id',
    sortable: true,
    cellProps: {
      style: { width: '25%' },
    },
  },
  {
    title: 'Nama Perusahaan',
    prop: 'NamaPerusahaan',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Nama Pemijaman',
    prop: 'NamaPeminjaman',
    sortable: true,
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Jumlah Box',
    prop: 'JumlahBox',
    sortable: true,
    cellProps: {
      style: { width: '20%' },
    },
  },
  // {
  //   title: 'Notes',
  //   prop: 'Notes',
  //   cellProps: {
  //     style: { width: '25%' },
  //   },
  // },
  {
    title: 'Action',
    prop: 'Action',
    cellProps: {
      style: { flex: 1 },
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
export const body = Array.from(new Array(1), () => {
  const rd = (Math.random() * 10).toFixed(10);

  return {
    id: `A000000${rd}`,
    NamaPerusahaan: '05 - 09 - 21',
    NamaPeminjaman: '09:52 WIB',
    JumlahBox: '10',
    // Notes: (
    //   <span className="notes">
    //     Lorem ipsum dolor sit amet, consectetur adipisicing elit
    //   </span>
    // ),
    Action: <Button>Lihat</Button>,
  };
});

export function DataTable() {
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
