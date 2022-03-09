import React from "react";
import { useRoutes} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue} from '@mui/material/colors';
import routes from './routes/routes';
import {getLocalStorage} from './utils/Storage';
import {defaultTheme, chillTheme} from './constants/theme';

let siteTheme = ( getLocalStorage('theme'))?chillTheme: defaultTheme;

const theme = createTheme({
 palette: {
  primary: {
    main: siteTheme.PRIMARY.MAIN,
    dark: siteTheme.PRIMARY.DARK,
    light: siteTheme.PRIMARY.LIGHT,
  }, 
  secondary: {
    main: siteTheme.SECONDARY.MAIN,
    dark: siteTheme.SECONDARY.DARK,
    light: siteTheme.SECONDARY.LIGHT,
  },
 },
}); 

const App = () =>{
  
  let elements = useRoutes(routes);

  return (
  <ThemeProvider theme={theme}>
   { elements }
  </ThemeProvider>
  );
}

export default App;
