// tslint:disable:object-literal-sort-keys

import { createMuiTheme } from "@material-ui/core/styles";

const msTheme = {
  palette: {
    themePrimary: "#333333",
    themeLighterAlt: "#f1faf1",
    themeLighter: "#caeaca",
    themeLight: "#a0d8a0",
    themeTertiary: "#55b155",
    themeSecondary: "#218d21",
    themeDarkAlt: "#0f700f",
    themeDark: "#0c5f0c",
    themeDarker: "#094609",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#fff",
    bodyBackground: "#fff",
    bodyText: "#333"
  },
  spacing: {
    unit: 6
  }
};

export default createMuiTheme({
  palette: {
    primary: {
      main: msTheme.palette.themePrimary
    }
  }
});
