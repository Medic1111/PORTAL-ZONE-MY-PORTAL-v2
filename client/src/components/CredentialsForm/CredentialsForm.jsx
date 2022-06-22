import { useSelector } from "react-redux";
import Register from "../Register/Register";
import Login from "../Login/Login";

const CredentialsForm = () => {
  const register = useSelector((state) => state.IsRegistering.isRegistering);
  const isTeacher = useSelector((state) => state.IsTeacher.isTeacher);

  return register ? <Register isTeacher={isTeacher} /> : <Login />;
};

export default CredentialsForm;
