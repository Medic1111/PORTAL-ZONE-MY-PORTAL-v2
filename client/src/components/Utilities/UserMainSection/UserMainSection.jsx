import classes from "./UserMainSection.module.css";
import Link from "../Link/Link";
import Button from "../Button/Button";
const UserMainSection = () => {
  return (
    <section className={classes.section}>
      {/* FIRST COMP-TEACHER */}
      <div className={classes.div}>
        <h4 className={classes.h4}>Class Name</h4>
        <p className={classes.p}>Key: 2647Last</p>
        <select className={classes.select}>
          <option className={classes.option}>Roster</option>
        </select>
        <Link innerTxt={"Chat"} />
      </div>
      {/*  */}
      {/* SECOND COMP */}
      <article className={classes.article}>
        <p className={classes.p2}>Assignments</p>
        <ul className={classes.ul}>
          <li className={classes.li}>TEST</li>
          <li className={classes.li}>TEST</li>
          <li className={classes.li}>TEST</li>
          <li className={classes.li}>TEST</li>
          <li className={classes.li}>TEST</li>
          <li className={classes.li}>TEST</li>
        </ul>
      </article>

      {/* THIRD COMP */}

      <section className={classes.section2}>
        <Button innerTxt={"Add Assigment"} />
        <Button innerTxt={"Delete Class"} />
      </section>
    </section>
  );
};
export default UserMainSection;
