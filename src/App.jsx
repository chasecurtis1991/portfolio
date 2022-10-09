import Logo from "./assets/logo.svg";
import "./App.css";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Portfolio from "./Portfolio"

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="hero-overlay"></div>
        <Hero />
        <Portfolio />
      <div className="card">
        <ul className="text-black">
          <li>Training Completed</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
