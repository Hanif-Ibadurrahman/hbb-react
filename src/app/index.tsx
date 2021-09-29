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

import { GlobalStyle } from '../styles/global-styles';

import { useTranslation } from 'react-i18next';
import { Sidebar } from './components/Sidebar';
import { NavBar } from 'app/components/NavBar';
import { DataTables } from './pages/Tables/DataTable/Loadable';
import { BoxPage } from './pages/BoxPage';
import { DetailBox } from './pages/BoxPage/Detail';

export function App() {
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
        <div className="content-wrapper w-100%">
          <Switch>
            <Route
              path={process.env.PUBLIC_URL + '/Login'}
              component={LoginPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/BoxPage'}
              component={BoxPage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/DetailBox'}
              component={DetailBox}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
