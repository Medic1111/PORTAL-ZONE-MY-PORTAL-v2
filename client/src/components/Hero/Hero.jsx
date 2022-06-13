import Button from "../Utilities/Button/Button";
import Link from "../Utilities/Link/Link";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <article className={classes.article}>
      <div className={classes.div}>
        <div className={classes.txtBox}>
          <h2 className={classes.h2}>Welcome!</h2>
          <p className={classes.mainP}>
            Portal zone is your platform to engage into mentoring and learning.
            A one place solution for direct communition between those who are
            willing to teach and those who are willing to learn!
          </p>
        </div>
        <div className={classes.btnBox}>
          <p className={classes.identifierP}>I am...</p>
          <Button innerTxt={"Mentoring"} />
          <p className={classes.identifierP}>I am...</p>

          <Button innerTxt={"Learning"} />
          <div className={classes.padLink}>
            <Link innerTxt={"Already registered? Log in"} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Hero;
