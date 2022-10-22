import "./App.css";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Portfolio from "./Portfolio"
import Certifications from "./Certifications";

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="hero-overlay"></div>
        <Hero />
        <Portfolio />
        <Certifications />
      <div className="card">
        <ul className="text-black">
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
