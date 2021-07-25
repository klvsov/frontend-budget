import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => {
  return createStyles({
    homeWrapper: {
      maxWidth: 1024,
      margin: "0 auto",
      padding: "0 5px",
      overflow: "hidden",
    },
  });
});

export default useStyle;
