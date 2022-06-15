import classes from "./Modal.module.css";
import Portal from "../../portal/portal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import { useSelector } from "react-redux";
import MainUser from "../../components/MainUser/MainUser";

const RegisterModal = ({ dark }) => {
  const showMainPage = useSelector((state) => state.IsLoggedIn.isUserLoggedIn);

  return (
    <Portal>
      <article className={dark ? `${classes.dark}` : `${classes.light}`}>
        <Header />
        {showMainPage ? <MainUser /> : <CredentialsForm />}
        <Footer />
      </article>
    </Portal>
  );
};

export default RegisterModal;
