import Logo from "./assets/logo.svg";
import "./App.css";
import Navbar from "./Navbar"
import Hero from "./hero"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
        <Hero />
      <div className="card">
        <ul className="text-black">
          <li>About Me</li>
          <li>Portfolio</li>
          <li>Active Projects</li>
          <li>Certifications</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
