import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary}`,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    fullWidth: {
        minWidth: "100%"
    },
    btnWrap: {
        marginTop: "2rem",

        "& button":{
            margin: "0 1rem"
        }
    }
}));

export default useStyle;
