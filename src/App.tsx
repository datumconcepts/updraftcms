import React from "react";

import UpdraftStore from './store'

import AppRouting from "./App.Routing";

import { LocalStorageData } from './middleware/data-persisitence/local-storage';

const App: React.FC = () => {

  return <UpdraftStore DataPersistenceMiddleware={new LocalStorageData()}>
    <AppRouting />
  </UpdraftStore>
}
export default App;