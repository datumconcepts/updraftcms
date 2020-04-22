import * as React from "react";

import UpdraftStore from './Store'

import AppRouting from "./App.Routing";

import { LocalStorageData } from './Middleware/data-persistence';

const App: React.FC = () => {

  return <UpdraftStore DataPersistenceMiddleware={new LocalStorageData}>
    <AppRouting />
  </UpdraftStore>
}
export default App;