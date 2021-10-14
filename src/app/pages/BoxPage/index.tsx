import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { Dropdown } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { DataTable } from 'app/components/Datatables';

import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';
import { connect } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import PaginatedBoxResponse from './Box/interface';

// const header = [
//   {
//     title: 'Pokemon Name',
//     prop: 'name'
//   },
//   {
//     title: 'URL',
//     prop: 'url',
//     cell: row => (
//       <a href={row.url} target="_blank">
//         {row.url}
//       </a>
//     )
//   }
// ];
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
    prop: 'code_box',
    sortable: true,
    cellProps: {
      style: { width: '75%' },
    },
  },
  {
    title: 'Action',
    prop: 'Action',
    cellProps: {
      style: { background: '#fafafa', flex: 1, width: '25%' },
      className: 'realname-class',
    },
    cell: row => {
      return (
        <BrowserRouter>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 200 }}>
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
      );
    },
  },
];

// export function BoxPage() {

//   function NavLinkAction(e, href) {
//     e.preventDefault();
//     window.location.pathname = href;
//   }

//   const NavLink = props => {
//     return (
//       <div onClick={e => NavLinkAction(e, props.href)}>{props.children}</div>
//     );
//   };

//   const header = [
//     {
//       title: 'Code Box',
//       prop: 'CodeBox',
//       sortable: true,
//       cellProps: {
//         style: { width: '25%' },
//       },
//     },
//     {
//       title: 'Tanggal',
//       prop: 'Tanggal',
//       sortable: true,
//       // Add classes and styles by objects and strings.
//       cellProps: {
//         style: { background: '#fafafa', width: '20%' },
//         className: 'realname-class',
//       },
//     },
//     {
//       title: 'Waktu',
//       prop: 'Waktu',
//       sortable: true,
//       cellProps: {
//         style: { width: '20%' },
//       },
//     },
//     {
//       title: 'Quantity',
//       prop: 'Quantity',
//       sortable: true,
//       cellProps: {
//         style: { background: '#fafafa', width: '20%' },
//         className: 'realname-class',
//       },
//     },
//     // {
//     //   title: 'Notes',
//     //   prop: 'Notes',
//     //   cellProps: {
//     //     style: { width: '25%' },
//     //   },
//     // },
//     {
//       title: 'Action',
//       prop: 'Action',
//       cellProps: {
//         style: { flex: 1 },
//         className: 'realname-class',
//       },
//     },
//   ];

//   let body = ({ boxs }) => {

//     return {
//       CodeBox: `({ boxs.code })`,
//       Tanggal: '05 - 09 - 21',
//       Waktu: '09:52 WIB',
//       Quantity: '10',
//       // Notes: (
//       //   <span className="notes">
//       //     Lorem ipsum dolor sit amet, consectetur adipisicing elit
//       //   </span>
//       // ),
//       Action: (
//         <BrowserRouter>
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//               Action
//             </Dropdown.Toggle>
//             <Dropdown.Menu style={{ minWidth: 200 }}>
//               <NavLink href="/Box/Detail">
//                 <Dropdown.Item>
//                   <div className="d-flex ai-center pv-2">
//                     <span className="icon">
//                       <i className="far fa-search p-sm mr-3"></i>
//                     </span>
//                     <span className="text">Detail</span>
//                   </div>
//                 </Dropdown.Item>
//               </NavLink>
//               <Dropdown.Item>
//                 <div className="d-flex ai-center pv-2">
//                   <span className="icon">
//                     <i className="far fa-copy p-sm mr-3"></i>
//                   </span>
//                   <span className="text">Duplicate</span>
//                 </div>
//               </Dropdown.Item>
//               <NavLink href="/Box/Edit">
//                 <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
//                 <Dropdown.Item>
//                   <div className="d-flex ai-center pv-2">
//                     <span className="icon">
//                       <i className="far fa-edit p-sm mr-3"></i>
//                     </span>
//                     <span className="text">Edit</span>
//                   </div>
//                 </Dropdown.Item>
//               </NavLink>
//               <div className="d-flex w-100% h-1px bg-medium op-25%"></div>
//               <Dropdown.Item>
//                 <div className="d-flex ai-center pv-2 tc-danger-5">
//                   <span className="icon">
//                     <i className="far fa-trash-alt p-sm mr-3"></i>
//                   </span>
//                   <span className="text">Delete</span>
//                 </div>
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </BrowserRouter>
//       ),
//     };
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Request Box</title>
//         <meta name="description" content="Request Box" />
//       </Helmet>
//       <div className="pos-r p-8">
//         <Header />
//         <DataTable tableHeader={header} tableBody={body} />
//       </div>
//     </>
//   );
// }

const baseURL = 'http://127.0.0.1:3333';

export function BoxPage() {
  const [data, setData] = useState([]);

  // API hit.
  async function getBoxes() {
    const { data } = await axios.get<PaginatedBoxResponse>(baseURL + `/boxes`);
    console.log(data.data);
    const newData = data.data as any;
    setData(newData);
  }

  useEffect(() => {
    getBoxes();
  }, []);

  return (
    <div className="pos-r p-8">
      <Header />
      <DataTable tableHeader={header} tableBody={data} />
    </div>
  );
}
