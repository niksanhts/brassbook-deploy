import SignHeader from "../../Componetns/signComponents/signHeader/SignHeader.jsx";
import styles from "./signUp.module.css";
import {Link} from "react-router-dom";
import SignInForm from "../../Componetns/signComponents/signInForm/SignInForm.jsx";
import pipe from "../../assets/img/Group 1.png";
import SignUpForm from "../../Componetns/signComponents/signUpForn/SignUpForm.jsx";

function SignUp() {
  return (
    <>
      <SignHeader />
      <main className={`${styles['sign-in']} container`}>
        <div className={styles['sign-in__info']}>
          <Link to={'/'} className={styles['sign-in__backlink']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="#190636" strokeOpacity="0.3" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Вернуться на главную
          </Link>
          <h1 className={styles['sign-in__title']}>Регистрация</h1>
          <p className={styles['sign-in__text']}>
            Выберите тип регистрации и введите необходимые данные. <br/>
            Вы уже зарегистрированны на сайте?  <Link to='/signin'>Войти</Link>
          </p>
        </div>
        <SignUpForm />
        <div>
          <img src={pipe} alt="" className={styles['imgback']}/>
        </div>
      </main>
    </>
  );
}

export default SignUp;