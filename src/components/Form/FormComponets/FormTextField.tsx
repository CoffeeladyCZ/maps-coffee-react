import React from 'react';
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FieldErrors } from '../../../types';

type FormTextFieldPropsType = {
  name: string,
  label: string,
  control: any,
  required: boolean,
  errors: FieldErrors,
}

const FormTextField: React.FC<FormTextFieldPropsType> = ({ name, control, errors, label, required }) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <TextField
          error={Boolean(errors[name])}
          helperText={errors[name] ? 'Položka je povinná' : ''}
          fullWidth
          type='text'
          label={label}
          required={required}
          variant='outlined'
          margin='dense'
          {...field}
        />
      )}
    />
  );
};

export default FormTextField;
