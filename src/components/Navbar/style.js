import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => {
  return createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      alignItems: "center",
      "&>div": {
        padding: 0,
      },
    },
    active: {
      color: "red",
    },
    linkButton: {
      color: "#fff",
    },
    activeRoute: {
      "& > button": {
        background: "rgba(0,0,0,.3)",
      },
    },
  });
});

export default useStyle;
