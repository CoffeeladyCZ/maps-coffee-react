import React from 'react';
import { Controller, Control } from "react-hook-form";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { TimePicker } from '@mui/x-date-pickers';

type FormTextFieldPropsType = {
  name: string,
  label: string,
  control: Control<any>,
  required: boolean,
  onChange?: (newValue: any) => void
}

const FormTextField: React.FC<FormTextFieldPropsType> = ({ name, control, label, required, onChange }) => {
  dayjs.extend(utc);


  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange: onFieldChange, value, ref } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label={label}
              value={dayjs.utc(value)}
              onChange={(newValue) => {
                onFieldChange(newValue);
                if (onChange) onChange(newValue);
              }}
              inputRef={ref}
            />
          </LocalizationProvider>
        )}

      }
    />
  );
};

export default FormTextField;
