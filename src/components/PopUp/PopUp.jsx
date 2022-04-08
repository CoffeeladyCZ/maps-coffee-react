import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { Link } from "react-router-dom";

import { useTogglePopup, usePopUpContextSubmitted } from '../../contexts/PopupContext';
import './PopUp.scss';
  


const PopUpContent = () => {
  const [signIt, setSignIt] = useState(false)
  const togglePopUp = useTogglePopup();
  const submit = usePopUpContextSubmitted();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const signForm = [
    { name: 'Uživatelské jméno', value: 'userName', type: 'text' },
    { name: 'Heslo', value: 'password', type: 'password' },
  ]

  function handleSubmit() {
    setSignIt(!signIt);
    togglePopUp();
    submit();
    formik.handleSubmit();
  }

  return (
    <form className='pop-up-body' onSubmit={handleSubmit}>
      <p>Zadejte své přihlašovací údaje</p>
      {signForm.map(item => {
        return (
          <div key={item.value} className="pop-up-body-row">
            <input 
              id={item.value} 
              name={item.value}
              type={item.type}
              required 
              className={formik.errors[item.value] ? 'errorInput' : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[item.value]}
            />
            <label htmlFor={item.value} className="placeholder">{item.name}</label>
          </div>
        ) 
      })}
      <div className='pop-up-body-btn'>
        <button type="submit" className="btn btn-submit">Submit</button>
      </div>
      <Link to="/registration" className='link'>Zaregistrovat se</Link>
    </form>
  )
}

const PopUp = () => {
  const selectBody = useRef(null);
  return (
    <div className='pop-up'>
      <div ref={selectBody}  tabIndex='1'>
        <PopUpContent />
      </div>
    </div>
  );
};

export default PopUp;
