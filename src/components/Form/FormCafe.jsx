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
    <form className="form" onSubmit={formik.handleSubmit}>
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
            className={formik.errors.nameCafe ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameCafe}
          />
          <label htmlFor="nameCafe" className="placeholder">Název kavárny</label>
        </div>
        {formik.touched.nameCafe && formik.errors.nameCafe ? (<div className="errorMessage">{formik.errors.nameCafe}</div>) : null}
        <div className="form-body-row">
          <input
            id="addressCafe"
            name="addressCafe"
            className={formik.errors.addressCafe ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.addressCafe}
          />
          <label htmlFor="addressCafe" className="placeholder">Adresa kavárny</label>
        </div>
        {formik.touched.addressCafe && formik.errors.addressCafe ? (<div className="errorMessage">{formik.errors.addressCafe}</div>) : null}
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
          {/* <label htmlFor="location" className="placeholder">Lokalita</label> */}
        </div>
        {formik.touched.location && formik.errors.location ? (<div className="errorMessage">{formik.errors.location}</div>) : null}
        <div className="form-body-row">
          <input
            id="openTime"
            name="openTime"
            type="openTime"
            className={formik.errors.openTime ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.openTime}
          />
          <label htmlFor="openTime" className="placeholder">Otevírací doba</label>
        </div>
        {formik.touched.openTime && formik.errors.openTime ? (<div className="errorMessage">{formik.errors.location}</div>) : null}
        <div className="form-body-row">
          <input
            id="web"
            name="web"
            type="web"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.web}
          />
          <label htmlFor="web" className="placeholder">Webové stránky</label>
        </div>
        {formik.touched.web && formik.errors.web ? (<div className="errorMessage">{formik.errors.location}</div>) : null}
        <div className="form-body-row">
          <input
            id="info"
            name="info"
            type="info"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info}
          />
          <label htmlFor="info" className="placeholder">Informace</label>
        </div>
        {formik.touched.info && formik.errors.info ? (
            <div className="errorMessage">{formik.errors.location}</div>
          ) : null}
        <div className="form-body-btn">
          <button type="reset" className="btn btn-clean">Clean</button>
          <button type="submit" className="btn btn-submit">Submit</button>
        </div>
      </div>
     </form>
  )
}

export default FormCafe;
