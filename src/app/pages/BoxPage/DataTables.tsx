import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { DataTable } from 'app/components/Datatables';

// Create table headers consisting of 4 columns.

export default function DataTables() {
  function NavLinkAction(e, href) {
    e.preventDefault();
    window.location.pathname = href;
  }

  const NavLink = props => {
    return (
      <div onClick={e => NavLinkAction(e, props.href)}>{props.children}</div>
    );
  };

  const header = [
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

  const body = Array.from(new Array(30), () => {
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
        <BrowserRouter>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 200 }}>
              <NavLink href="/Box/Detail">
                <Dropdown.Item>
                  <div className="d-flex ai-center pv-2">
                    <span className="icon">
                      <i className="far fa-search p-sm mr-3"></i>
                    </span>
                    <span className="text">Detail</span>
                  </div>
                </Dropdown.Item>
              </NavLink>
              <Dropdown.Item>
                <div className="d-flex ai-center pv-2">
                  <span className="icon">
                    <i className="far fa-copy p-sm mr-3"></i>
                  </span>
                  <span className="text">Duplicate</span>
                </div>
              </Dropdown.Item>
              <NavLink href="/Box/Edit">
                <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
                <Dropdown.Item>
                  <div className="d-flex ai-center pv-2">
                    <span className="icon">
                      <i className="far fa-edit p-sm mr-3"></i>
                    </span>
                    <span className="text">Edit</span>
                  </div>
                </Dropdown.Item>
              </NavLink>
              <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
              <Dropdown.Item>
                <div className="d-flex ai-center pv-2 tc-danger-5">
                  <span className="icon">
                    <i className="far fa-trash-alt p-sm mr-3"></i>
                  </span>
                  <span className="text">Delete</span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </BrowserRouter>
      ),
    };
  });

  return (
    <>
      <div className="d-flex fd-col-r">
        <DataTable tableHeader={header} tableBody={body} />
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
