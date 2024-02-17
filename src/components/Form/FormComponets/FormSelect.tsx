import React from 'react';
import { Controller, Control } from "react-hook-form";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material/";

type FormSelectPropsType = {
  name: string,
  label: string,
  control: Control<any>,
  required: boolean,
  options: string[] | null,
}

const FormSelect: React.FC<FormSelectPropsType> = ({ name, control, label, required, options }) => {
  return (
    <FormControl fullWidth required={required} margin='dense'>
      <Controller
        name={name}
        defaultValue="All"
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, value } }) => (
          <>
            <InputLabel id="select">{ label }</InputLabel>
            <Select
              labelId="select"
              label={label}
              value={value}
              size="small"
              onChange={onChange}
            >
              {
                options && options.map((item: string, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>
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
