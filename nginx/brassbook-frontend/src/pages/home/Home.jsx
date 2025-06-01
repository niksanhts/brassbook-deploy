import HomeHeader from "../../Componetns/homeComponents/homeHeader/HomeHeader.jsx";
import "./tube.css"
import "./notes-from-tube.css"
import tube from '../../assets/img/tube.png';
import notesFromTube from '../../assets/img/notesFromTube.png';
import HomeHero from "../../Componetns/homeComponents/homeHero/HomeHero.jsx";
import HomeAbout1 from "../../Componetns/homeComponents/homeAbout1/HomeAbout1.jsx";
import HomeAbout2 from "../../Componetns/homeComponents/homeAbout2/HomeAbout2.jsx";
import Tutor1 from "../../Componetns/homeComponents/tutor1/Tutor1.jsx";
import Tutor2 from "../../Componetns/homeComponents/tutor2/Tutor2.jsx";
import HomeMore from "../../Componetns/homeComponents/homeMore/HomeMore.jsx";

function Home(props) {
  return (
    <>
      <HomeHeader />
      <main>
        <div className="tube">
          <img src={tube} alt="Труба"/>
        </div>
        <div className="notes-from-tube">
          <img src={notesFromTube} alt={"Ноты"} />
        </div>
        <HomeHero />
        <HomeAbout1 />
        <HomeAbout2 />
        <Tutor1 />
        <Tutor2 />
        <HomeMore />
      </main>
      <HomeHeader isFooter={true} />
    </>
  );
}

export default Home;