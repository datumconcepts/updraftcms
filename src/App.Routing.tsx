import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
;
import ObjectModelsListPage from "pages/object-models";
import ObjectModelsEditPage from "pages/object-models/edit";

import ContentDocumentsListPage from "pages/content-documents";
import ContentDocumentsEditPage from "pages/content-documents/edit"

import MediaObjectsPage from "pages/media-objects";


const AppRouting: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/object-models" exact={true} component={ObjectModelsListPage} />
        <Route path="/object-models/:id/edit" component={ObjectModelsEditPage} />
        <Route path="/:objectmodelId?/content" exact={true} component={ContentDocumentsListPage} />
        <Route path="/:objectmodelId?/content/:id/edit" component={ContentDocumentsEditPage} />
        <Route path="/media-library" component={MediaObjectsPage} />
        <Redirect path="*" to="/object-models" />
      </Switch>
    </Router>
  );
}

export default AppRouting;
