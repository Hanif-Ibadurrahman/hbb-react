import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ModalHapus } from './components/Modalhapus';
import React, { useState } from 'react';
import { DataTable } from 'app/components/Datatables';

export function DataTables() {
  function NavLinkAction(e, href) {
    e.preventDefault();
    window.location.pathname = href;
  }

  const NavLink = props => {
    return (
      <div onClick={e => NavLinkAction(e, props.href)}>{props.children}</div>
    );
  };

  const [modalShow, setModalShow] = useState(false);

  const header = [
    {
      title: 'Nama Record Center',
      prop: 'RecordCenter',
      sortable: true,
      cellProps: {
        style: { width: '75%' },
      },
    },
    {
      title: 'Action',
      prop: 'Action',
      cellProps: {
        style: { width: '25%', background: '#fafafa' },
        className: 'realname-class',
      },
    },
  ];

  const body = Array.from(new Array(30), () => {
    return {
      RecordCenter: `RC Bogor`,
      Action: (
        <>
          <div className="d-flex jc-center">
            <NavLink href="Area/Edit">
              <Button variant="warning mr-2">
                Edit<i className="fas fa-edit ml-2"></i>
              </Button>
            </NavLink>
            <ModalHapus show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </>
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
