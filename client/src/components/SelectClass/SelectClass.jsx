import classes from "./SelectClass.module.css";
import Quote from "inspirational-quotes";
const SelectClass = () => {
  let randomQuote = Quote.getQuote();

  return (
    <article className={classes.article}>
      <p className={classes.pTitle}>{new Date().toLocaleDateString()}</p>
      <p className={classes.pQuote}>"{randomQuote.text}"</p>
      <p className={classes.pAuthor}>- {randomQuote.author}</p>
      <p className={classes.pSelect}>Select a class to start</p>
    </article>
  );
};

export default SelectClass;
