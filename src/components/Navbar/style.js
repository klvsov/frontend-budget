import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => {
  return createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      alignItems: 'center',
      flexDirection: 'row',
      '&>div': {
        padding: 0,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    active: {
      color: 'red',
    },
    linkButton: {
      color: '#fff',
    },
    logout: {
      position: 'absolute',
      right: 9,
      color: '#fff',
    },
    activeRoute: {
      '& > button': {
        background: 'rgba(0,0,0,.3) !important',
      },
    },
  });
});

export default useStyle;
