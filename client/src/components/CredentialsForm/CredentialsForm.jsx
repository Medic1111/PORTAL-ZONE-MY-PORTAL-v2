import { useSelector } from "react-redux";
import Register from "../Register/Register";
import Login from "../Login/Login";

const CredentialsForm = () => {
  const register = useSelector((state) => state.IsRegistering.isRegistering);
  const isTeacher = useSelector((state) => state.IsTeacher.isTeacher);

  {
    if (register) {
      return <Register isTeacher={isTeacher} />;
    } else {
      return <Login />;
    }
  }
};

export default CredentialsForm;
