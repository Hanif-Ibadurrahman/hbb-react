import React, { useState } from 'react';
import Logo from 'assets/images/logo.png';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './sidebar.scoped.scss';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  DashboardData,
  PeminjamanData,
  MasterData,
  CustomerMasterData,
} from './SidebarData';
import IconHome from 'assets/images/icon/icon-1.png';
import IconUI from 'assets/images/icon/icon-2.png';
import IconAdvanced from 'assets/images/icon/icon-3.png';
import IconForm from 'assets/images/icon/icon-4.png';
import IconTable from 'assets/images/icon/icon-5.png';

export function Sidebar() {
  const [isActive] = useState<boolean>(true);
  const [role, setRole] = useState('admin');

  const CustomerMenu = props => {
    return (
      <>
        <MenuItem
          id={window.location.pathname === '/' ? 'active' : ''}
          className=" pos-r"
          icon={<img src={IconHome} className="h-5" alt="awSnap" />}
          onClick={() => {
            window.location.pathname = '/';
          }}
        >
          {''} Beranda
        </MenuItem>
        <SubMenu
          className="pos-r"
          icon={<img src={IconAdvanced} className="h-5" alt="awSnap" />}
          title="Master"
        >
          {CustomerMasterData.map((val, key) => {
            return (
              <MenuItem
                id={
                  window.location.pathname.split(val.link).pop() ? '' : 'active'
                }
                className="pos-r"
                icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {''}
                {val.title}
              </MenuItem>
            );
          })}
        </SubMenu>
        <MenuItem
          id={
            window.location.pathname === '/Customer/Borrow-Box' ? 'active' : ''
          }
          className=" pos-r"
          icon={<img src={IconForm} className="h-5" alt="awSnap" />}
          onClick={() => {
            window.location.pathname = '/Customer/Borrow-Box';
          }}
        >
          {''} Peminjaman
        </MenuItem>
        <MenuItem
          id={
            window.location.pathname === 'Customer/Returning-Box'
              ? 'active'
              : ''
          }
          className=" pos-r"
          icon={<img src={IconUI} className="h-5" alt="awSnap" />}
          onClick={() => {
            window.location.pathname = 'Customer/Returning-Box';
          }}
        >
          {''} Pengembalian
        </MenuItem>
        <MenuItem
          id={
            window.location.pathname === 'Customer/Destroy-Suggestion'
              ? 'active'
              : ''
          }
          className=" pos-r"
          icon={<img src={IconTable} className="h-5" alt="awSnap" />}
          onClick={() => {
            window.location.pathname = 'Customer/Destroy-Suggestion';
          }}
        >
          {''} Usulan Penghapusan
        </MenuItem>
      </>
    );
  };

  const AdminMenu = props => {
    return (
      <>
        <SubMenu
          className="pos-r"
          icon={<img src={IconHome} className="h-5" alt="awSnap" />}
          title="Dashboard"
        >
          {DashboardData.map((val, key) => {
            return (
              <MenuItem
                id={
                  window.location.pathname.split(val.link).pop() ? '' : 'active'
                }
                className="pos-r"
                icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {''}
                {val.title}
              </MenuItem>
            );
          })}
        </SubMenu>
        <SubMenu
          className=""
          icon={<img src={IconForm} className="h-5" alt="awSnap" />}
          title="Peminjaman"
        >
          {PeminjamanData.map((val, key) => {
            return (
              <MenuItem
                id={
                  window.location.pathname.split(val.link).pop() ? '' : 'active'
                }
                className="pos-r"
                icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {''}
                {val.title}
                <span className="h-6 w-6 bd-rs-6 bg-danger-5 d-flex ai-center jc-center ml-a">
                  <span className="text tc-danger-contrast">5</span>
                </span>
              </MenuItem>
            );
          })}
        </SubMenu>
        <SubMenu
          className=""
          icon={<img src={IconAdvanced} className="h-5" alt="awSnap" />}
          title="Master"
        >
          {MasterData.map((val, key) => {
            return (
              <MenuItem
                id={
                  window.location.pathname.split(val.link).pop() ? '' : 'active'
                }
                className="pos-r"
                icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {''}
                {val.title}
              </MenuItem>
            );
          })}
        </SubMenu>
      </>
    );
  };

  return (
    <div className={`sidebar bg-medium-tint w-20% ${isActive ? '' : 'icon'}`}>
      <div className="sidebar-header">
        <div className="ph-4 h-20 bg-dark-contrast d-flex ai-center">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
      </div>
      <ProSidebar>
        <Menu iconShape="square">
          {role === 'admin' ? <AdminMenu /> : <CustomerMenu />}
        </Menu>
        {/* <div className="w-8 h-8 bd-rs-6 d-flex jc-center ai-center ml-a mr-a pos-r p-2 bg-warning-3 btn-sidebar cur-p" onClick={handleToggle}><i className="fas fa-chevron-left"></i></div> */}
      </ProSidebar>
    </div>
  );
}
