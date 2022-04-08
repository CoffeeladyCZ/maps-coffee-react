import React from "react"; 
import { Link } from "react-router-dom";
import { useFormik } from 'formik';

import './FormCafe.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import AppSelect from '../SelectItem/AppSelect';

import { formItems, cityDistrict, selectItems } from '../../data/data';

const validate = values => {
  const errors = {};
  if (!values.nameCafe) {
    errors.nameCafe = 'Required';
  }
  if (!values.addressCafe) {
    errors.addressCafe = 'Required';
  } 
  if (!values.location) {
    errors.location = 'Required';
  }
  if (!values.openTime) {
    errors.openTime = 'Required';
  } 
  return errors;
};

const FormCafe = () => {
  const formik = useFormik({
     initialValues: {
       nameCafe: '',
       addressCafe: '',
       location: '',
       openTime: '',
       web: '',
       info: '',
     },
     onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
     },
  });

  return (
    <form className="form"  onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
    <div className="form-head">
      <Link to="/" className='form-head__icon'>
        <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
      </Link>
      <h1 className="form-title">Zadej údaje o nové kavárně</h1>
    </div>
      <div className="form-body">
        <div className="form-body-row">
          <AppSelect selectItems={cityDistrict} selectName={selectItems} value={formik.values.location} name='lokalita' />
        </div>
        { 
          formItems.map(item => {
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
                  {formik[item.value] && formik.errors[item.value] ? formik.errors[item.value] : null}
                </div>
              </div>
             
            )
          })
        }
        <div className="form-body-btn">
          <button type="reset" className="btn btn-clean">Clean</button>
          <button type="submit" className="btn btn-submit" onClick={validate}>Submit</button>
        </div>
      </div>
     </form>
  )
}

export default FormCafe;
