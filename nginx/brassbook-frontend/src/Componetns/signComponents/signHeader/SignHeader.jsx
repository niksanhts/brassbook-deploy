import styles from "./header.module.css";
import {Link} from "react-router-dom";
import HomeLoginButton from "../../homeComponents/homeLoginButton/HomeLoginButton.jsx";

function SignHeader(props) {
  const links =
    <ul className={styles['nav__body']}>
      <li><a href="#" className={styles['nav__link']}>О проекте</a></li>
      <li><a href="#" className={styles['nav__link']}>Команда</a></li>
      <li><a href="#" className={styles['nav__link']}>Галерея</a></li>
      <li><a href="#" className={styles['nav__link']}>Связаться с нами</a></li>
    </ul>
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <div className={styles['header__logo']}>
          <Link to={"/"}>
            BrassBook
          </Link>
        </div>
        <nav className={styles['nav']}>
          {links}
        </nav>
      </div>
    </header>
  );
}

export default SignHeader;