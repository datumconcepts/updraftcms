import * as React from "react";


import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles'

// import Constants from "./Constants";

import UpdraftStore from './Store'

import AppRouting from "./App.Routing";
import theme from "./App.Theme";

import Layout from "./Presentation/_Layout";

import { LocalStorageData } from './Middleware/data-persistence';

export default class App extends React.Component<any, any> {

  public render() {
    return <UpdraftStore DataPersistenceMiddleware={new LocalStorageData}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <AppRouting />
          </Layout>
        </Router>
      </ThemeProvider>
    </UpdraftStore>
  }
}
