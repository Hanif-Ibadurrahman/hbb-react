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

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { Accordions } from './pages/UIElements/Accordions/Loadable';
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
        <Sidebar />
        <div className="content-wrapper w-80%">
          <NavBar />
          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + '/'}
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
