import classes from "./SectionWrapper.module.css";

const SectionWrapper = (props) => {
  return <article className={classes.article}>{props.children}</article>;
};

export default SectionWrapper;
