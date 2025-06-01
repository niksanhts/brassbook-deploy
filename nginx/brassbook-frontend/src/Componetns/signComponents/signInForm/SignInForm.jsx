import React, { useState } from 'react';
import styles from './signInForm.module.css'
import YellowButton from "../../yellowButton/YellowButton.jsx";
import { useNavigate } from "react-router-dom";
import { $api } from "../../../api/index.js";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "../../../store/userSlice.js";

function SignInForm(props) {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const canSubmit = !data.email && !data.password
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    setErrors({
      email: '',
      password: ''
    })
    e.preventDefault()
    const { data: responseData } = await $api.post('/v1/auth/login', data)
    if (responseData?.error) {
      responseData.field === 'email' ? setErrors(prev => ({ ...prev, email: responseData.error })) : setErrors(prev => ({ ...prev, password: responseData.error }))
    } else {
      localStorage.setItem('accessToken', responseData.accessToken)
      dispatch(setIsAuthorized(true))
      navigate('/user')
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles['sign-form__fields-container']}>
        <div className={styles['sign-form__field']}>
          <div className={styles['label-container']}>
            <label htmlFor="email">Почта</label>
            {errors.email && <div className={styles['sign-form__error']}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
                  fill="#F37979" />
                <path d="M8 10.6666V7.99998M8 5.33331H8.00667" stroke="white" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              {errors.email}
            </div>}
          </div>
          <input
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            name="email"
            id="email"
            placeholder="Введите вашу почту"
            className={styles['sign__input']}
            type="email"
          />
        </div>
        <div className={styles['sign-form__field']}>
          <div className={styles['label-container']}>
            <label htmlFor="password">Пароль</label>
            {errors.password && <div className={styles['sign-form__error']}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
                  fill="#F37979" />
                <path d="M8 10.6666V7.99998M8 5.33331H8.00667" stroke="white" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              {errors.password}
            </div>}
          </div>
          <input
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
            name="password"
            id="password"
            placeholder="Введите пароль"
            className={styles['sign__input']}
            type="password"
          />
        </div>
      </div>
      <div className={styles['sign-form__btn-container']}>
        <YellowButton type={'btn'} htmlButtonType={'submit'} additionalClass={styles['sign-page-button']}
          disabled={canSubmit}>Войти</YellowButton>
      </div>
    </form>
  );
}

export default SignInForm;