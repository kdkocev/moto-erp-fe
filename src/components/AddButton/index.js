import React from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const AddButton = ({ onClick, children }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    startIcon={<AddIcon />}>
    {children}
  </Button>
);

export default AddButton;
