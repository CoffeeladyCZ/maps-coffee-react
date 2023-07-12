import React from 'react';
import { Controller } from "react-hook-form";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material/";
import { cityLocations } from '../../../types';

type FormSelectPropsType = {
  name: string,
  label: string,
  control: any,
  required: boolean,
  options: cityLocations,
}

const FormSelect: React.FC<FormSelectPropsType> = ({ name, control, label, required, options }) => {
  return (
    <FormControl fullWidth required={required} margin='dense'>
      <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, value } }) => (
          <>
            <InputLabel id="select">{ label }</InputLabel>
            <Select
              labelId="select"
              label={label}
              value={value}
              onChange={onChange}
            >
              {
                options && options.map((item, index) => {
                  return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                })
              }
            </Select>
          </>
        )}
      />
    </FormControl>
  )
}

export default FormSelect;
