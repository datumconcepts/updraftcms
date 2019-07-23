// tslint:disable:object-literal-sort-keys

import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme:Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      minWidth: 0 // So the Typography noWrap works
    }
  });
