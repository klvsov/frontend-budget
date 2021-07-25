import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => {
  return createStyles({
    chartsWrapper: {
      maxWidth: 1024,
      margin: "0 auto",
      padding: 10,
    },
    period: {
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    lineWrap: {
      margin: "8px 0",
      padding: "8px 0",
      "&>div": {
        minHeight: 300,
      },
    },
    space: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      height: "100%",
    },
  });
});

export default useStyle;
