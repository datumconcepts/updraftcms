// tslint:disable:object-literal-sort-keys

import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme:Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 1,
      position: "relative",
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawerPaper: {
      position: "relative",
      width: 50
    },
    content: {
      flexGrow: 1,
      minWidth: 0, // So the Typography noWrap works
      display: "flex",
      flexDirection: "column"
    }
  });
