// tslint:disable:object-literal-sort-keys

import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    propertyEditor: {
      flex: 1,
      paddingBottom: theme.spacing.unit * 4,
      minHeight: "100%",
      background: theme.palette.background.default
    },
    propertyList: {
      minHeight: "100%"
    },
    spacer: {
      flex: "1 1 auto"
    },
    workspace: {
      flexGrow: 1
    }
  });
