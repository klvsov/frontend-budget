import LoaderImage from "assets/animation.gif";
import useStyle from './style';

export const Loader = () => {
  const classes = useStyle();
  return (
    <div className={classes.preloaderWrap}>
      <img src={LoaderImage} alt="dollar icon"/>
    </div>
  )
};