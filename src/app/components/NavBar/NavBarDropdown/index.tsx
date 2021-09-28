import React, { useEffect } from 'react';
import Profile from 'assets/images/profile.png';
import Dropdown from 'react-bootstrap/Dropdown';
// import styled from 'styled-components/macro';

const Username = props => {
  return (
    <span className="username text txtf-c p-lg tc-primary-contrast pr-12">
      {props.username}
    </span>
  );
};

export function NavBarDropdown(props) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown-toggle p-0 bg-n bd-n bd-rs-0 h-20">
        <div className="d-flex ai-center">
          <div className="w-2px h-20 bg-dark-contrast op-25%"></div>
          <div className="d-flex ai-center jc-center h-16 w-16 bd-rs-16 of-h mh-4">
            <img src={Profile} alt="Logo" className="h-100%" />
          </div>
          <Username username={props.username} />
          <i className="dropdown-toggle-indicator fas fa-chevron-down tc-primary-contrast"></i>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="pos-r">
        <Dropdown.Item className="ph-6" href="#/action-1">
          <div className="d-flex ai-center p-lg">
            <span className="icon mr-4 d-flex ai-center">
              <i className="far fa-cog"></i>
            </span>
            <span className="text">Setting</span>
          </div>
        </Dropdown.Item>
        <span className="d-block h-1px w-100% bg-medium-tint op-50% mv-2"></span>
        {/* separator */}
        <Dropdown.Item className="ph-6" href="#/action-1">
          <div className="d-flex ai-center p-lg tc-danger-5">
            <span className="icon mr-4 d-flex ai-center">
              <i className="far fa-sign-out"></i>
            </span>
            <span className="text">Logout</span>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
