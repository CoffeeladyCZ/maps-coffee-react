import React from 'react';
import { Controller, Control } from "react-hook-form";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TimeField } from '@mui/x-date-pickers/TimeField';

type FormTextFieldPropsType = {
  name: string,
  label: string,
  control: Control,
  required: boolean,
}

const FormTextField: React.FC<FormTextFieldPropsType> = ({ name, control, label, required }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            label={label}
            required={required}
            variant='outlined'
            size="small"
            margin='dense'
            fullWidth={false}
            {...field}
          />
        </LocalizationProvider>

      )}
    />
  );
};

export default FormTextField;
