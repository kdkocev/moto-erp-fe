import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const SelectField = ({ helperText, ...props }) => {
  const { label, fullWidth, error, options } = props;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel error={error}>{label}</InputLabel>
      <Select {...props}>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
