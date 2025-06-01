import styles from './signIn.module.css'
import SignHeader from "../../Componetns/signComponents/signHeader/SignHeader.jsx";
import {Link} from "react-router-dom";
import pipe from '../../assets/img/Group 1.png'
import SignInForm from "../../Componetns/signComponents/signInForm/SignInForm.jsx";

function SignIn(props) {
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
          <h1 className={styles['sign-in__title']}>Вход</h1>
          <p className={styles['sign-in__text']}>
            Войдите в систему, чтобы начать пользоваться сервисом. <br/>
            Вы еще не зарегистрированны на сайте? <Link to='/signup'>Зарегистрироваться</Link>
          </p>
        </div>
        <div className={styles['sign-in__forget-container']}>
          <div className={styles['sign-in__forget-title']}>Забыли пароль?</div>
          <a href="" className={styles['sign-in__forget-link']}>Восстановить</a>
        </div>
        <SignInForm />
        <div>
          <img src={pipe} alt="" className={styles['imgback']}/>
        </div>
      </main>
    </>
  );
}

export default SignIn;