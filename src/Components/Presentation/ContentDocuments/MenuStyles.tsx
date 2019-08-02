// tslint:disable:object-literal-sort-keys

import { createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      left: 51,
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  });
