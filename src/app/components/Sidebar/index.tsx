// import * as React from 'react';
import Logo from 'assets/images/logo.png';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BasicUIData } from './SidebarDataTemplate';
import { AdvancedUIData } from './SidebarDataTemplate';
import { FormData } from './SidebarDataTemplate';
import { TableData } from './SidebarDataTemplate';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from "react";
import IconHome from 'assets/images/icon/icon-1.png';
import IconUI from 'assets/images/icon/icon-2.png';
import IconAdvanced from 'assets/images/icon/icon-3.png';
import IconForm from 'assets/images/icon/icon-4.png';
import IconTable from 'assets/images/icon/icon-5.png';

export function Sidebar() {
  const [isActive, setActive] = useState<boolean>(true);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className={`sidebar bg-medium-tint w-20% ${isActive ? "" : "icon"}`}>
      <div className="sidebar-header">
        <div className="ph-4 h-20 bg-dark-contrast d-flex ai-center">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
      </div>

      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem id={window.location.pathname == "/" ? "active" : ""}
            className=" pos-r"
            icon={<img src={IconHome} className="h-5" alt="awSnap" />} onClick={() => { window.location.pathname = "/" }}>
            {""} Dashboard
          </MenuItem>
          <SubMenu className="pos-r" icon={<img src={IconUI} className="h-5" alt="awSnap" />} title="Basic UI Element">
            {BasicUIData.map((val, key) => {
              return (
                <MenuItem id={window.location.pathname.split(val.link).pop() ? "" : "active"}
                  className="pos-r"
                  icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                  key={key} onClick={() => { window.location.pathname = val.link }}>
                  {""}{val.title}
                </MenuItem>
              )
            })}
          </SubMenu>
          <SubMenu className="" icon={<img src={IconAdvanced} className="h-5" alt="awSnap" />} title="Advanced UI Element">
            {AdvancedUIData.map((val, key) => {
              return (
                <MenuItem id={window.location.pathname.split(val.link).pop() ? "" : "active"}
                  className="pos-r"
                  icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                  key={key} onClick={() => { window.location.pathname = val.link }}>
                  {""}{val.title}
                </MenuItem>
              )
            })}
          </SubMenu>
          <SubMenu className="" icon={<img src={IconForm} className="h-5" alt="awSnap" />} title="Form Elements">
            {FormData.map((val, key) => {
              return (
                <MenuItem id={window.location.pathname.split(val.link).pop() ? "" : "active"}
                  className="pos-r"
                  icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                  key={key} onClick={() => { window.location.pathname = val.link }}>
                  {""}{val.title}
                </MenuItem>
              )
            })}
          </SubMenu>
          <SubMenu className="" icon={<img src={IconTable} className="h-5" alt="awSnap" />} title="Tables">
            {TableData.map((val, key) => {
              return (
                <MenuItem id={window.location.pathname.split(val.link).pop() ? "" : "active"}
                  className="pos-r"
                  icon={<img src={val.icon} className="h-5" alt="awSnap" />}
                  key={key} onClick={() => { window.location.pathname = val.link }}>
                  {""}{val.title}
                </MenuItem>
              )
            })}
          </SubMenu>
        </Menu>
        {/* <div className="w-8 h-8 bd-rs-6 d-flex jc-center ai-center ml-a mr-a pos-r p-2 bg-warning-3 btn-sidebar cur-p" onClick={handleToggle}><i className="fas fa-chevron-left"></i></div> */}
      </ProSidebar>
    </div>
  );
}