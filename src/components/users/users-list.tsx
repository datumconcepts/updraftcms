import * as React from "react";
import { useHistory } from "react-router";

import AppContent from "components/high-order/AppContent";

const UsersList: React.FC = () => {

  const history = useHistory();

  return (
    <AppContent>
        Users page
    </AppContent >
  );
}

export default UsersList;
