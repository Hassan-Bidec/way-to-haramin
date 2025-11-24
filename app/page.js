import Image from "next/image";
import Hero from "./components/hero";
import Simple from "./components/simple";
import Vehicle from "./components/Vehicle";
import TrustWay from "./components/TrustWay";
import AgentGroup from "./components/AgentGroup";
import Travelers from "./components/Travelers";
import Footer from "./components/Footer";

export default function Home() {
  return (
<>
<Hero/>
<Simple/>
<Vehicle/>
<TrustWay/>
<AgentGroup/>
<Travelers/>
<Footer/>
</>
  );
}
