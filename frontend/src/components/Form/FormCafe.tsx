import React from "react"; 
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";

import './FormCafe.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import AppSelect from '../SelectItem/AppSelect';

import { formItems, cityDistrict, selectItems } from '../../data/data';

interface FormType {
  [key:string]: string;
  nameCafe: string;
  addressCafe: string;
  location: string;
  openTime: string;
  web: string;
  info: string;
}

type FormItems = {
  name: string;
  value: string;
}
// TODO předělat validaci - podle docs formik
const validate = (values: FormType) => {
  const errors: {[key:string]: string} = {};
  if (!values.nameCafe) {
    errors.nameCafe = t('validation:required');
  }
  if (!values.addressCafe) {
    errors.addressCafe = t('validation:required');
  } 
  if (!values.location) {
    errors.location = t('validation:required');
  }
  if (!values.openTime) {
    errors.openTime = t('validation:required');
  } 
  return errors;
};

const FormCafe: React.FC = () => {
  const { t } = useTranslation();

  const formik = useFormik<{[key:string]: string}>({
     initialValues: {
       nameCafe: '',
       addressCafe: '',
       location: '',
       openTime: '',
       web: '',
       info: '',
     },
     onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
     },
  });

  return (
    <form className="form"  onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
    <div className="form-head">
      <Link to="/" className='form-head__icon'>
        <FontAwesomeIcon icon={faArrowLeft} size={"xl" as SizeProp}/>
      </Link>
      <h1 className="form-title">t('fformTitle')</h1>
    </div>
      <div className="form-body">
        <div className="form-body-row">
          <AppSelect selectItems={cityDistrict} selectName={selectItems} value={formik.values.location} name='lokalita' />
        </div>
        { 
          formItems.map((item: FormItems) => {
            return (
              <div key={item.value}>
                <div className="form-body-row">
                  <input 
                    id={item.value} 
                    name={item.value}
                    required 
                    className={formik.errors[item.value] ? 'errorInput' : ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[item.value]}
                  />
                  <label htmlFor={item.value} className="placeholder">{item.name}</label>
                </div>
                <div className="errorMessage">
                  {formik.errors[item.value] ? formik.errors[item.value] : null}
                </div>
              </div>
            )
          })
        }
        <div className="form-body-btn">
          <button type="reset" className="btn btn-clean">Clean</button>
          <button type="submit" className="btn btn-submit">Submit</button>
        </div>
      </div>
     </form>
  )
}

export default FormCafe;
