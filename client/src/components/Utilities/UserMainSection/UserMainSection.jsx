import classes from "./UserMainSection.module.css";
import MainSecFirstComp from "../MainSecFirstComp/MainSecFirstComp";
import MainSecCompTwo from "../MainSecCompTwo/MainSecCompTwo";
import MainSecCompThree from "../MainSecCompThree/MainSecCompThree";

const UserMainSection = () => {
  return (
    <section className={classes.section}>
      <MainSecFirstComp />
      <MainSecCompTwo />
      <MainSecCompThree />
    </section>
  );
};
export default UserMainSection;
