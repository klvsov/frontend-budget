import { useMediaQuery } from '@material-ui/core';

const START_MOBILE_MD = 375;

export const useWindowSize = () => {
  const isMobileMd = useMediaQuery(`(max-width:${START_MOBILE_MD}px)`);

  return {
    isMobileMd,
  };
};
