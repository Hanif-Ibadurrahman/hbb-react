import * as React from 'react';
import { NavBarDropdown } from './NavBarDropdown/index';
import Profile from 'assets/images/profile.png';

export function NavBar() {
  return (
    <div className="navbar pt-0 pb-0">
      <div className="pl-4 h-20 w-100% bg-primary-5 d-flex ai-center">
        <div className="ml-a cur-p">
          <NavBarDropdown username="Muarif Gustiar" profile={Profile} />
        </div>
      </div>
    </div>
  );
}
