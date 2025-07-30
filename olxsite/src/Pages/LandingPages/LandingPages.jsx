import Comp1 from "../../Component/Landing/LandingCom1";
import Comp2 from "../../Component/Landing/AllboxCategory";

const Home = () => {

  // const fadeInUp = {
  //   hidden: { opacity: 0, y: 100 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  // };

  return (
    <div className="Component">
      <div className="HomeComponent">

     
          <Comp1 />

          <Comp2 />


      </div>

   
    </div>
  );
};

export default Home;
