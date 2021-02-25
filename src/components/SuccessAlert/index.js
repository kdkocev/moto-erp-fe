import React from 'react';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const SuccessAlert = ({ open, onClose, message }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    disableWindowBlurListener={true}
    onClose={onClose}>
    <Alert onClose={onClose} elevation={6} variant="filled" severity="success">
      {message}
    </Alert>
  </Snackbar>
);

export default SuccessAlert;
