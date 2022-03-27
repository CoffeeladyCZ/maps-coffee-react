import React from "react"; 
import { useFormik } from 'formik';


import './FormCafe.scss';

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
      <h1 className="form-title">Zadej údaje o nové kavárně</h1>
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
          <label htmlFor="nameCafe">Název kavárny</label>
          {formik.touched.nameCafe && formik.errors.nameCafe ? (
            <div className="errorMessage">{formik.errors.nameCafe}</div>
            ) : null}

        </div>

        <div className="form-body-row">
          <label htmlFor="addressCafe">Adresa kavárny</label>
          <input
            id="addressCafe"
            name="addressCafe"
            className={formik.errors.addressCafe ? 'errorInput' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.addressCafe}
          />
          {formik.touched.addressCafe && formik.errors.addressCafe ? (
          <div className="errorMessage">{formik.errors.addressCafe}</div>
        ) : null}
        </div>

        <div className="form-body-row">
          <label htmlFor="location">Lokalita</label>
            <input
              id="location"
              name="location"
              type="location"
              className={formik.errors.location ? 'errorInput' : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location ? (
            <div className="errorMessage">{formik.errors.location}</div>
          ) : null}
        </div>
        
        <div className="form-body-row">
          <label htmlFor="openTime">Otevírací doba</label>
            <input
              id="openTime"
              name="openTime"
              type="openTime"
              className={formik.errors.openTime ? 'errorInput' : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.openTime}
            />
            {formik.touched.openTime && formik.errors.openTime ? (
            <div className="errorMessage">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="form-body-row">
          <label htmlFor="web">Webové stránky</label>
            <input
              id="web"
              name="web"
              type="web"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.web}
            />
            {formik.touched.web && formik.errors.web ? (
            <div className="errorMessage">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="form-body-row">
          <label htmlFor="info">Informace</label>
            <input
              id="info"
              name="info"
              type="info"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.info}
            />
            {formik.touched.info && formik.errors.info ? (
            <div className="errorMessage">{formik.errors.location}</div>
          ) : null}
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
