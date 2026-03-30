import {Navbar, Welcome, Dock} from "#components";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import {Finder, Resume, Safari, Terminal, Text, Image, Contact} from "#windows";
import TourGuide from "#components/TourGuide.jsx";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
      <main>
          <Navbar/>
          <Welcome/>
          <Dock/>

          <Terminal/>
          <Safari/>
          <Resume/>
          <Finder/>
          <Text/>
          <Image/>
          <Contact/>
          <TourGuide/>
      </main>
  )
};

export default App;