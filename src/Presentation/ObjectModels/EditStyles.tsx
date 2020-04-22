// tslint:disable:object-literal-sort-keys

export default (theme: any) =>
  ({
    propertyEditor: {
      flex: 1,
      paddingBottom: theme.spacing(4),
      minHeight: "100%",
      background: theme.palette.background.default
    },
    propertyList: {
      minHeight: "100%"
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    spacer: {
      flex: "1 1 auto",
      maxWidth: 'inherit'
    },
    workspace: {
      flexGrow: 1
    },
    fileUpload: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      display: "flex",
    }
  });
