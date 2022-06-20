import classes from "./App.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Modal from "./modals/Modal/Modal";
import io from "socket.io-client";

const socket = io.connect("/");

function App() {
  const dark = useSelector((state) => state.DarkMode.isDarkMode);
  const toggleLogReg = useSelector((state) => state.LogRegModal.isModal);

  return (
    <div className={dark ? `${classes.darkApp}` : `${classes.lightApp}`}>
      <Header dark={dark} />
      {toggleLogReg && <Modal dark={dark} socket={socket} />}
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
