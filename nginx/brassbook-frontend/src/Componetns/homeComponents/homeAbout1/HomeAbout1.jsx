import child1 from "../../../assets/img/child1.png"
import '../about.css'

function HomeAbout1(props) {
  return (
    <section className="about">
      <div className="about__container container">
        <div className="about__info">
          <div className="about__title">«BrassBook» -</div>
          <div className="about__text about__text_accent">образовательная платформа, созданная<br/> для учеников классов
            медных духовых<br/> и ударных инструментов детских<br/> музыкальных школ и школ искусств<br/> Российской
            Федерации.
          </div>
          <div className="about__text text">Платформа состоит из музыкальных дидактических материалов, созданных
            преподавателями<br/> Санкт-Петербургской детской школы искусств<br/> имени С.С. Прокофьева Азаматом
            Анваровичем<br/> Латыповым и Татьяной Александровной Савиновой.
          </div>
        </div>
        <div className="about__img"><img src={child1} alt=""/></div>
      </div>
    </section>
  );
}

export default HomeAbout1;