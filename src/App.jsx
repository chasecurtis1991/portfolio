import Logo from "./assets/logo.svg";
import "./App.css";
import Navbar from "./Navbar"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="card">
        <ul className="text-white">
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
