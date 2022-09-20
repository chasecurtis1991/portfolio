import Logo from "./assets/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <img src={Logo} className="logo" alt="Chase Curtis logo" />
      </div>
      <div className="card">
        <p>New website coming soon!</p>
      </div>
    </div>
  );
}

export default App;
