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

import { HomePage } from './HomePage/Loadable';
import { NotFoundPage } from './NotFoundPage/Loadable';
import { Accordions } from './UIElements/Accordions/Loadable';
import { useTranslation } from 'react-i18next';
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
// ALL USER
import { UserProfile } from './ProfilePage/Loadable';
// import { form } from 'app/components/Form/Index';

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
            <Route
              exact
              path={process.env.PUBLIC_URL + '/Dashboard'}
              component={HomePage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/BasicUI/Accordions'}
              component={Accordions}
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
              path={process.env.PUBLIC_URL + '/DetailBoxCSR'}
              component={DetailBoxCSR}
            />
            <Route
              path={process.env.PUBLIC_URL + '/EditBoxCSR'}
              component={EditBoxCSR}
            />

            {/*--------- ALL USER ---------*/}
            <Route
              path={process.env.PUBLIC_URL + '/Profile/'}
              component={UserProfile}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
