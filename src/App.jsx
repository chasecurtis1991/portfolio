import "./App.css";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Portfolio from "./Portfolio"
import Certifications from "./Certifications";
import Contact from "./Contact";

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="hero-overlay"></div>
        <Hero />
        <Portfolio />
        <Certifications />
        <Contact />
    </div>
  );
}

export default App;
