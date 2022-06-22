import { useSelector } from "react-redux";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Loading from "../Utilities/Loading/Loading";

const CredentialsForm = () => {
  const loading = useSelector((state) => state.IsLoading.loading);
  const register = useSelector((state) => state.IsRegistering.isRegistering);
  const isTeacher = useSelector((state) => state.IsTeacher.isTeacher);

  // return register ? <Register isTeacher={isTeacher} /> : <Login />;
  {
    if (loading) {
      return <Loading />;
    } else {
      return register ? <Register isTeacher={isTeacher} /> : <Login />;
    }
  }
};

export default CredentialsForm;
