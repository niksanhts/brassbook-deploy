import styles from './header.module.css'
import footer from './footer.module.css'
import {Link} from "react-router-dom";
import HomeLoginButton from "../homeLoginButton/HomeLoginButton.jsx";
function HomeHeader({isFooter}) {
  const links =
    <ul className={styles['nav__body']}>
      <li><a href="#" className={styles['nav__link']}>О проекте</a></li>
      <li><a href="#" className={styles['nav__link']}>Произведения</a></li>
      <li><a href="#" className={styles['nav__link']}>Команда</a></li>
      <li><a href="#" className={styles['nav__link']}>Публикации</a></li>
      <li><a href="#" className={styles['nav__link']}>Библиотека</a></li>
    </ul>

  if (isFooter)
    return (
      <header className={`${styles['header']} ${footer['footer']}`}>
        <div className={styles['header__container']}>
          <div className={styles['header__logo']}>
            <Link to={"/"}>
              BrassBook
            </Link>
          </div>
          <nav className={styles['nav']}>
            {links}
          </nav>
          <div className={footer['footer__copyright']}>
            ©2019-2024, Brassbook.Все права защищены
          </div>
        </div>
      </header>
    )

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
        <div className={styles["header__btns"]}>
          <HomeLoginButton color={'blue'} to={'/signin'}>Войти</HomeLoginButton>
          <HomeLoginButton color={'white'} to={'/signup'}>Зарегистрироваться</HomeLoginButton>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;