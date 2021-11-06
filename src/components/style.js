import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  head: {
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  table: {
    minWidth: 700,
  },
  rows: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.focus,
    },
  },
  actionIcon: {
    width: 35,
    height: 35,
    margin: '0 5px',
    padding: 5,
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: '50%',
    cursor: 'pointer',

    '&:hover': {
      background: theme.palette.action.hover,
    },
    '&:active': {
      background: theme.palette.action.active,
    },
  },
  error: {
    marginTop: '1rem',
  },
}));

export default useStyle;
