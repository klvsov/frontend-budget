import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => {
  return createStyles({
    preloaderWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10px auto',

      '& > img': {
        maxWidth: 50,
      },
    },
  });
});

export default useStyle;
