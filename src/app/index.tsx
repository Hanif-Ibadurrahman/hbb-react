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
import { LoginPage } from './pages/LoginPage';
import { Routes } from './pages/Routes';

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
          </Switch>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
