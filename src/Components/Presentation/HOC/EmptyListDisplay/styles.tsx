// tslint:disable:object-literal-sort-keys

import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme:Theme) =>
  createStyles({
    emptyList: {
      padding: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.default,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      border: theme.spacing.unit + "px dashed " + theme.palette.divider,
      display: "flex",
      cursor: "pointer"
    }
  });
