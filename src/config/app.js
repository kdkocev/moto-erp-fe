import React from 'react';

import Routes from 'config/routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const App = () => (
  <CssBaseline>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Routes />
    </MuiPickersUtilsProvider>
  </CssBaseline>
);

export default App;
