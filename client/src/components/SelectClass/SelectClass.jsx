import classes from "./SelectClass.module.css";
import Quote from "inspirational-quotes";
import { useSelector } from "react-redux";
const SelectClass = () => {
  let randomQuote = Quote.getQuote();
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  return (
    <article className={classes.article}>
      <p className={dark ? `${classes.darkPdate}` : `${classes.lightPdate}`}>
        {new Date().toLocaleDateString()}
      </p>
      <div className={classes.quoteBox}>
        <p
          className={dark ? `${classes.darkPquote}` : `${classes.lightPquote}`}
        >
          "{randomQuote.text}"
        </p>
        <p
          className={
            dark ? `${classes.darkPauthor}` : `${classes.lightPauthor}`
          }
        >
          - {randomQuote.author}
        </p>
      </div>
    </article>
  );
};

export default SelectClass;
