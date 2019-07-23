import * as React from "react";

import { Provider } from 'react-redux';

import { BrowserRouter as Router } from "react-router-dom";

import { MuiThemeProvider } from '@material-ui/core/styles';

// import Constants from "./Constants";

import { store } from './Store'

import AppRouting from "./App.Routing";
import theme from "./App.Theme";

import Layout from "./Components/Presentation/_Layout";

export default class App extends React.Component<any, any> {

  public render() {
    return <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Layout>
            <AppRouting />
          </Layout>
        </Router>
      </MuiThemeProvider>
    </Provider>
  }
}
