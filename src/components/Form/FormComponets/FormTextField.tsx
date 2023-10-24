import React from 'react';
import { Controller } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import TextField from "@mui/material/TextField";
import { FieldErrors } from '../../../types/cafe';

type FormTextFieldPropsType = {
  name: string,
  label: string,
  control: any,
  required: boolean,
  errors: FieldErrors,
}

const FormTextField: React.FC<FormTextFieldPropsType> = ({ name, control, errors, label, required }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <TextField
          error={Boolean(errors[name])}
          helperText={errors[name] ? t('errors.required') : ''}
          fullWidth
          type='text'
          label={label}
          required={required}
          variant='outlined'
          size="small"
          margin='dense'
          {...field}
        />
      )}
    />
  );
};

export default FormTextField;
