// tslint:disable:object-literal-sort-keys


export default (theme: any) =>
  ({
    content: {
      flexGrow: 1,
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(5),
      minWidth: 0 // So the Typography noWrap works
    }
  });
