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
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Routes } from './pages/Routes';
import { Sidebar } from './components/Sidebar';
import { NavBar } from 'app/components/NavBar';
import { AreaPage } from './pages/AreaPage/Loadable';
import { DivisiPage } from './pages/DivisiPage/Loadable';
import { LemariPage } from './pages/LemariPage/Loadable';

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
            <Route path={process.env.PUBLIC_URL + '/'} component={Routes} />
              exact
              path={process.env.PUBLIC_URL + '/'}
              component={HomePage}
            />
            <Route
              path={process.env.PUBLIC_URL + '/BasicUI/Accordions'}
              component={Accordions}
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
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
