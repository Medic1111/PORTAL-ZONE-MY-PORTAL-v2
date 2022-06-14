import classes from "./App.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import RegisterModal from "./modals/RegisterModal/RegisterModal";

function App() {
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const fetchApi = () => {
    axios
      .get("/api")
      .then((serverRes) => console.log(serverRes.data))
      .catch((err) => console.log(err));
  };

  // useEffect(fetchApi, []);

  return (
    <div className={dark ? `${classes.darkApp}` : `${classes.lightApp}`}>
      <Header dark={dark} />
      <RegisterModal dark={dark} />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
