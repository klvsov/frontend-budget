import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => {
  return createStyles({
    categoriesWrapper: {
      maxWidth: 1024,
      margin: '0 auto',
    },
  });
});

export default useStyle;
