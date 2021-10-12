import React, { useState } from 'react';
import { DataTable } from 'app/components/Datatables';
import Button from 'react-bootstrap/Button';
import { ModalHapus } from './components/Modalhapus';

export function LemariTables() {
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
        style: { width: '25%' },
      },
    },
    {
      title: 'Nama Ruang',
      prop: 'Ruang',
      sortable: true,
      cellProps: {
        style: { width: '25%' },
      },
    },
    {
      title: 'Kode Lemari',
      prop: 'KodeLemari',
      sortable: true,
      cellProps: {
        style: { width: '25%' },
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
      Ruang: `Bogor 1`,
      KodeLemari: `320`,
      Action: (
        <div className="d-flex jc-center">
          <NavLink href="Lemari/Edit">
            <Button variant="warning mr-2">
              Edit<i className="fas fa-edit ml-2"></i>
            </Button>
          </NavLink>
          <ModalHapus show={modalShow} onHide={() => setModalShow(false)} />
        </div>
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
