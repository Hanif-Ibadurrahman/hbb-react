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

import { HomePage } from './HomePage/Loadable';
import { NotFoundPage } from './NotFoundPage/Loadable';
import { Accordions } from './UIElements/Accordions/Loadable';
import { useTranslation } from 'react-i18next';
import { Sidebar } from '../components/Sidebar';
import { NavBar } from '../components/NavBar';
import { DataTables } from './Tables/DataTable/Loadable';
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
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
