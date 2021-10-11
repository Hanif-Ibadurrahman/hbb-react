import * as React from 'react';
import { Button } from 'react-bootstrap';
import { DataTable } from 'app/components/Datatables';

export function DataTables() {
  const header = [
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
