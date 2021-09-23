import * as React from 'react';
import Logo from 'assets/images/logo.png';
import { NavBarDropdown } from './NavBarDropdown';

export function NavBar() {
  return (
    <div className="navbar pt-0 pb-0">
      <div className="pl-4 h-20 w-100% bg-primary-5 d-flex ai-center">
        <img src={Logo} alt="Logo" className="h-16 op-0%" />
        <div className="ml-a cur-p">
          <NavBarDropdown /> 
        </div>
      </div>
    </div>
  );
}