import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './FormCafe.scss';

import { KeyboardBackspace } from '@mui/icons-material';

import AppSelect from '../SelectItem/AppSelect';

import { formItems, cityLocations, selectItems } from '../../data/data';

interface FormType {
  [key:string]: string | number | string[];
  name: string;
  address: string;
  location: string[];
  time: string;
  web: string;
  description: string;
  lat: number | string;
  lng: number | string;
}

type FormItems = {
  name: string;
  value: string;
}

const FormCafe: React.FC = () => {
  const formik = useFormik<{[key:string]: string}>({
    initialValues: {
      name: '',
      address: '',
      location: '',
      lat: '',
      lng: '',
      time: '',
      web: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .label('Full Name')
        .required('Item is required'),
      address: Yup.string()
        .required('Item is required'),
      time: Yup.string()
        .required('Item is required'),
      web: Yup.string()
        .required('Item is required'),
      lat: Yup.string()
        .required('Item is required'),
      lng: Yup.string()
        .required('Item is required'),
    }),
    onSubmit: () => {
      console.log('formik data', formik.values);
      createCafe();
    },
  });

  const baseURL = 'http://localhost:5000/api/cafe/create';

  const createCafe = async () => {
    const response = {
      name: formik.values.name,
      address: formik.values.address,
      location: ['All', formik.values.location],
      time: formik.values.time,
      content: formik.values.content,
      lat: formik.values.lat,
      lng: formik.values.lng,
      image: []
    }

    try {
      await axios.post(baseURL, response);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form className='form'  onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className='form-head'>
        <Link to='/' className='form-head__icon'>
          <KeyboardBackspace fontSize='large' />
        </Link>
        <h1 className='form-title'>Zadej údaje o nové kavárně</h1>
      </div>
      <div className='form-body'>
        <div className='form-body-row'>
          <AppSelect selectItems={cityLocations} selectName={selectItems} value={formik.values.location} name='lokalita' />
        </div>
        {
          formItems.map((item: FormItems) => {
            return (
              <div key={item.value}>
                <div className='form-body-row'>
                  <input
                    id={item.value}
                    name={item.value}
                    required
                    className={formik.errors[item.value] ? 'errorInput' : ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[item.value]}
                  />
                  <label htmlFor={item.value} className='placeholder'>{item.name}</label>
                </div>
                <div className='errorMessage'>
                  {formik.errors[item.value] ? formik.errors[item.value] : null}
                </div>
              </div>
            )
          })
        }
        <div className='form-body-btn'>
          <button type='reset' className='btn btn-clean'>Clean</button>
          <button type='submit' className='btn btn-submit'>Submit</button>
        </div>
      </div>
    </form>
  )
}

export default FormCafe;
