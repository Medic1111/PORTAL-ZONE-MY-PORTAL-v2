import classes from "./RegisterModal.module.css";
import Portal from "../../portal/portal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";

// CHANGE NAME TO JUST MODAL, IS LOGGEDIN TRUE,
// RENDERS MAIN USR PAGE
// ELSE, RENDER CREDENTIALS FORM

const RegisterModal = ({ dark }) => {
  return (
    <Portal>
      <article className={dark ? `${classes.dark}` : `${classes.light}`}>
        <Header />
        <CredentialsForm />
        <Footer />
      </article>
    </Portal>
  );
};

export default RegisterModal;
