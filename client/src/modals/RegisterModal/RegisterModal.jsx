import classes from "./RegisterModal.module.css";
import Portal from "../../portal/portal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const RegisterModal = ({ dark }) => {
  return (
    <Portal>
      <article className={dark ? `${classes.dark}` : `${classes.light}`}>
        <Header />
        {/* IsTeacher? */}
        <h1>TESTING MODAL IN PORTAL</h1>
        <Footer />
      </article>
    </Portal>
  );
};

export default RegisterModal;
