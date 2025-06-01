import "../about.css"
import child2 from '../../../assets/img/child2.png'
import YellowButton from "../../yellowButton/YellowButton.jsx";

function HomeAbout2(props) {
  return (
    <section className="about" style={{padding: '90px 0'}}>
      <div className="about__container container">
        <div className="about__info" style={{order: 2}}>
          <div className="text" style={{marginBottom: '48px'}}>С помощью наших фонограмм музыканты могут играть в домашних условиях в сопровождении <span style={{fontWeight: 600}}>качественного цифрового аккомпанемента.</span>
          </div>
          <div className="text" style={{marginBottom: '48px'}}>Использование нашей разработки вовлекает исполнителей в активную форму музицирования, поэтому мы рекомендуем играть дома используя наше сопровождение на протяжении всего времени обучения, но на концертах исполнять произведения под аккомпанемент концертмейстера.</div>
          <YellowButton type={'link'} to={'/'} additionalClass={'about__button'}>Попробовать</YellowButton>
        </div>

        <div className="about__img"><img src={child2} alt=""/></div>
      </div>
    </section>
  );
}

export default HomeAbout2;