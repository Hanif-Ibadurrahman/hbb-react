import * as React from 'react';
import Datatable from 'react-bs-datatable';
import { Dropdown } from 'react-bootstrap';

// Create table headers consisting of 4 columns.
export const header = [
  {
    title: 'Code Box',
    prop: 'CodeBox',
    sortable: true,
    cellProps: {
      style: { width: '25%' },
    },
  },
  {
    title: 'Tanggal',
    prop: 'Tanggal',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
    },
  },
  {
    title: 'Waktu',
    prop: 'Waktu',
    sortable: true,
    cellProps: {
      style: { width: '20%' },
    },
  },
  {
    title: 'Quantity',
    prop: 'Quantity',
    sortable: true,
    cellProps: {
      style: { background: '#fafafa', width: '20%' },
      className: 'realname-class',
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
export const body = Array.from(new Array(30), () => {
  const rd = (Math.random() * 10).toFixed(2);

  return {
    CodeBox: `A1232${rd}`,
    Tanggal: '05 - 09 - 21',
    Waktu: '09:52 WIB',
    Quantity: '10',
    // Notes: (
    //   <span className="notes">
    //     Lorem ipsum dolor sit amet, consectetur adipisicing elit
    //   </span>
    // ),
    Action: (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Action
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: 200 }}>
          <Dropdown.Item href="/DetailBox">
            <div className="d-flex ai-center pv-2">
              <span className="icon">
                <i className="far fa-search p-sm mr-3"></i>
              </span>
              <span className="text">Detail</span>
            </div>
          </Dropdown.Item>
          <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
          <Dropdown.Item href="#/action-2">
            <div className="d-flex ai-center pv-2">
              <span className="icon">
                <i className="far fa-copy p-sm mr-3"></i>
              </span>
              <span className="text">Duplicate</span>
            </div>
          </Dropdown.Item>
          <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
          <Dropdown.Item href="#/action-3">
            <div className="d-flex ai-center pv-2">
              <span className="icon">
                <i className="far fa-edit p-sm mr-3"></i>
              </span>
              <span className="text">Edit</span>
            </div>
          </Dropdown.Item>
          <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
          <Dropdown.Item href="#/action-3">
            <div className="d-flex ai-center pv-2 tc-danger-5">
              <span className="icon">
                <i className="far fa-trash-alt p-sm mr-3"></i>
              </span>
              <span className="text">Delete</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
  };
});

export function DataTables() {
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
