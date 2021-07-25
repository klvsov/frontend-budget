import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles(() => {
  return createStyles({
    '@global': {
      '*, *::before, *::after': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      a: {
        textDecoration: 'none'
      }
    },
    main: {
      maxWidth: 1024,
      margin: "2rem auto"
    }
  })
});

export default useStyle