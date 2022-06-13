import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const fetchApi = () => {
    axios
      .get("/api")
      .then((serverRes) => console.log(serverRes.data))
      .catch((err) => console.log(err));
  };

  useEffect(fetchApi, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My portal</h1>
      </header>
    </div>
  );
}

export default App;
