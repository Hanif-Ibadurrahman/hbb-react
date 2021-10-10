/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../../styles/global-styles';

import { Sidebar } from '../components/Sidebar';
import { NavBar } from '../components/NavBar';
// --=-=-=-=-=-=- BIOLERPLATE EXAMPLE -=-=-=-=-=-=-=-
import { HomePage } from './HomePage/Loadable';
import { NotFoundPage } from './NotFoundPage/Loadable';
import { Accordions } from './UIElements/Accordions/Loadable';
import { useTranslation } from 'react-i18next';
// --=-=-=-=-=-=- BIOLERPLATE EXAMPLE -=-=-=-=-=-=-=-

// DASHBOARD
import { DashboardSuperadmin } from './Dashboard/Superadmin';
import { DashboardAdminCSR } from './Dashboard/AdminCSR';
import { DashboardAdminRC } from './Dashboard/AdminRC';
import { DashboardAdminTransport } from './Dashboard/AdminTransport';
// -=-=-=-=-=-
import { DataTables } from './Tables/DataTable/Loadable';
import { BoxPage } from './BoxPage/Loadable';
import { DetailBox } from './BoxPage/Detail';
import { EditBox } from './BoxPage/Edit';
import { TimeLine } from './TimeLinePage/Loadable';
import { AreaPage } from './AreaPage/Loadable';
import { DivisiPage } from './DivisiPage/Loadable';
import { LemariPage } from './LemariPage/Loadable';
import { VehiclePage } from './VehiclePage/Loadable';
import { EditVehicle } from './VehiclePage/Edit';
//ADMIN CSR
import { ApprovalBoxPage } from './AdminCSR/BoxPage/Loadable';
import { DetailBoxCSR } from './AdminCSR/BoxPage/Detail';
import { EditBoxCSR } from './AdminCSR/BoxPage/Edit';
// -=-=-=-=-=-
// CUSTOMER
import { BorrowBoxPage } from './Customer/BorrowBox/Loadable';
// -=-=-=-=-=-
// ALL USER
import { UserProfile } from './ProfilePage/Loadable';
// import { form } from 'app/components/Form/Index';
//ADMIN RC
import { AsignBoxPage } from './AdminRC/BoxPage';
import { DetailBoxRC } from './AdminRC/BoxPage/Detail';
import { EditBoxRC } from './AdminRC/BoxPage/Edit';

export function Routes() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <div className="d-flex all-wrapper">
        <Sidebar />
        <div className="content-wrapper w-80%">
          <NavBar />
          <Switch>
            {/* <Route
              exact
              path={process.env.PUBLIC_URL + '/Dashboard'}
              component={HomePage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/BasicUI/Accordions'}
              component={Accordions}
            /> */}

            {/*---------- DASHBOARD ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/Dashboard/Superadmin'}
              component={DashboardSuperadmin}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Dashboard/CSR'}
              component={DashboardAdminCSR}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Dashboard/RC'}
              component={DashboardAdminRC}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Dashboard/Transport'}
              component={DashboardAdminTransport}
            />

            <Route
              path={process.env.PUBLIC_URL + '/Table/DataTables'}
              component={DataTables}
            />
            <Route
              path={process.env.PUBLIC_URL + '/BoxPage'}
              component={BoxPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Box/DetailBox'}
              component={DetailBox}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Box/EditBox'}
              component={EditBox}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Timeline'}
              component={TimeLine}
            />
            <Route
              path={process.env.PUBLIC_URL + '/AreaPage'}
              component={AreaPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/DivisiPage'}
              component={DivisiPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/LemariPage'}
              component={LemariPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/VehiclePage'}
              component={VehiclePage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/Vehicle/EditVehicle'}
              component={EditVehicle}
            />
            {/*--------- ADMIN CSR ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/ApprovalBoxPage'}
              component={ApprovalBoxPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/CSR/DetailBox'}
              component={DetailBoxCSR}
            />
            <Route
              path={process.env.PUBLIC_URL + '/CSR/EditBox'}
              component={EditBoxCSR}
            />

            {/*---------- CUSTOMER ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/Customer/Borrow-Box'}
              component={BorrowBoxPage}
            />

            {/*--------- ALL USER ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/Profile/'}
              component={UserProfile}
            />
            {/*--------- ADMIN RC ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/AsignBox/'}
              component={AsignBoxPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/RC/DetailBox/'}
              component={DetailBoxRC}
            />
            <Route
              path={process.env.PUBLIC_URL + '/RC/EditBox/'}
              component={EditBoxRC}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
