import React, { useState } from 'react';
import styles from './signUpForm.module.css'
import YellowButton from "../../yellowButton/YellowButton.jsx";
import axios from "axios";
import { $api } from "../../../api/index.js";
import { useNavigate } from "react-router-dom";

function SignUpForm(props) {
  const navigate = useNavigate()

  const [accountType, setAccountType] = useState('personal')
  const [isEmailVerificationStep, setIsEmailVerificationStep] = useState(false)
  const [personalRegistrationData, setPersonalRegistrationData] = useState({
    email: '',
    password: '',
    passwordRepeated: ''
  })
  const [companyRegistrationData, setCompanyRegistrationData] = useState({
    firstName: '',
    secondName: '',
    companyName: '',
    companyRole: '',
    inn: '',
    email: '',
    password: '',
    passwordRepeated: ''
  })

  const [verificationCode, setVerificationCode] = useState('')

  const errors = {
    email: '',
    password: '',
    passwordRepeated: ''
  }

  const fields = (accountType === 'personal' ?
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
          value={personalRegistrationData.email}
          onChange={e => setPersonalRegistrationData({ ...personalRegistrationData, email: e.target.value })}
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
          value={personalRegistrationData.password}
          onChange={e => setPersonalRegistrationData({ ...personalRegistrationData, password: e.target.value })}
          name="password"
          id="password"
          placeholder="Придумайте пароль"
          className={styles['sign__input']}
          type="password"
          style={{ marginBottom: '10px' }}
        />
        <input
          value={personalRegistrationData.passwordRepeated}
          onChange={e => setPersonalRegistrationData({ ...personalRegistrationData, passwordRepeated: e.target.value })}
          name="passwordRepeated"
          id="passwordRepeated"
          placeholder="Придумайте пароль"
          className={styles['sign__input']}
          type="password"
        />
      </div>
      <div className={styles['sign-form__btn-container']}>
        <YellowButton
          type={'btn'}
          htmlButtonType={'submit'}
          additionalClass={styles['sign-page-button']}
          disabled={!(!!personalRegistrationData.email && !!personalRegistrationData.password && (personalRegistrationData.password === personalRegistrationData.passwordRepeated))}
          onClick={async (e) => {
            e.preventDefault()
            const { data } = await $api.post('/v1/auth/registration', {
              "role_name": "ROLE_PERSONAL",
              "password": personalRegistrationData.password,
              "email": personalRegistrationData.email
            })
            console.log(data)
            if (!data?.error)
              setIsEmailVerificationStep(true)
          }}
        >
          Продолжить
        </YellowButton>
      </div>
    </div>
    :
    <div className={styles['sign-form__fields-container']}>
      <div className={styles['sign-form__field']}>
        <div className={styles['label-container']}>
          <label htmlFor="firstName">Имя</label>
        </div>
        <input
          value={companyRegistrationData.firstName}
          onChange={e => setCompanyRegistrationData({ ...companyRegistrationData, firstName: e.target.value })}
          name="firstName"
          id="firstName"
          placeholder="Введите вашу почту"
          className={styles['sign__input']}
          type="text"
        />
      </div>
    </div>
  )
  return (
    <div>
      <form action="">
        {!isEmailVerificationStep ? fields :
          <>
            <div className={styles['sign-form__fields-container']}>
              <div className={styles['sign-form__fields-container']}>
                <div className={styles['sign-form__field']}>
                  <div className={styles['label-container']}>
                    <label htmlFor="verificationCode">Код, высланный на указанную почту</label>
                  </div>
                  <input
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    name="verificationCode"
                    id="verificationCode"
                    placeholder="Код"
                    className={styles['sign__input']}
                    type="text"
                  />
                </div>
              </div>
              <YellowButton
                type={'btn'}
                additionalClass={styles['sign-page-button']}
                onClick={async (e) => {
                  e.preventDefault()
                  const { data } = await $api.put('/v1/auth/verifyuser', {
                    "code": Number(verificationCode),
                    "email": personalRegistrationData.email
                  })
                  if (!data?.error)
                    navigate('/signin')
                }}
              >
                Продолжить
              </YellowButton>
            </div>
          </>
        }
      </form>
    </div>
  );
}

export default SignUpForm;