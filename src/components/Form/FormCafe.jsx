import React from "react"; 
import { Link } from "react-router-dom";
import { useFormik } from 'formik';

import './FormCafe.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { cityDistrict } from "../../data/data";

const validate = values => {
  const errors = {};
 
  if (!values.nameCafe) {
    errors.nameCafe = 'Required';
  } else if (values.nameCafe.length > 20) {
    errors.nameCafe = 'Must be 15 characters or less';
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
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

  return (
    <form className="form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
    <div className="form-head">
       <Link to="/" className='form-head__icon'>
        <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
      </Link>
      <h1 className="form-title">Zadej údaje o nové kavárně</h1>
    </div>
      <div className="form-body">
        <div className="form-body-row">
          <input
            id="nameCafe"
            name="nameCafe"
            required
            className={formik.errors.nameCafe ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameCafe}
          />
          <label htmlFor="nameCafe" className="placeholder">Název kavárny</label>
        </div>
        <div className="errorMessage">
          {formik.nameCafe && formik.errors.nameCafe ? formik.errors.nameCafe : null}
        </div>
        <div className="form-body-row">
          <input
            id="addressCafe"
            name="addressCafe"
            required
            className={formik.errors.addressCafe ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.addressCafe}
          />
          <label htmlFor="addressCafe" className="placeholder">Adresa kavárny</label>
        </div>
        <div className="errorMessage">
          {formik.touched.addressCafe && formik.errors.addressCafe ? formik.errors.addressCafe : null}
        </div>
        <div className="form-body-row">
          <select
            id="location"
            name="location"
            className={formik.errors.location ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          >
            <option>Vyber lokalitu:</option>
            {cityDistrict.map(location => {
              return <option>{location.name}</option>
            })}
          </select>
        </div>
        <div className="errorMessage">
          {formik.touched.location && formik.errors.location ? formik.errors.location : null}
        </div>
        <div className="form-body-row">
          <input
            id="openTime"
            name="openTime"
            type="openTime"
            required
            className={formik.errors.openTime ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.openTime}
          />
          <label htmlFor="openTime" className="placeholder">Otevírací doba</label>
        </div>
        <div className="errorMessage">
          {formik.touched.openTime && formik.errors.openTime ? formik.errors.openTime : null}
        </div>
        
        <div className="form-body-row">
          <input
            id="web"
            name="web"
            type="web"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.web}
          />
          <label htmlFor="web" className="placeholder">Webové stránky</label>
        </div>
        <div className="errorMessage">
          {formik.touched.web && formik.errors.web ? formik.errors.web : null}
        </div>
        <div className="form-body-row">
          <input
            id="info"
            name="info"
            type="info"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info}
          />
          <label htmlFor="info" className="placeholder">Informace</label>
        </div>
        <div className="errorMessage">
          {formik.touched.info && formik.errors.info ? formik.errors.info : null}
        </div>
        <div className="form-body-btn">
          <button type="reset" className="btn btn-clean">Clean</button>
          <button type="submit" className="btn btn-submit">Submit</button>
        </div>
      </div>
     </form>
  )
}

export default FormCafe;
