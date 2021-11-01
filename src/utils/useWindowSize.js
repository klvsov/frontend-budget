import { useMediaQuery } from "@material-ui/core";

const START_MOBILE_MD = 375;

export const useWindowSize = () => {
  // const isDesktop = useMediaQuery(`(min-width:${startTablet}px)`);
  
  // const isTablet = useMediaQuery(`(max-width:${startTablet}px)`);
  
  const isMobileMd = useMediaQuery(`(max-width:${START_MOBILE_MD}px)`);
  
  // const isMobileSm = useMediaQuery(`(max-width:${startMobileSmall}px)`);
  
  return {
    // isDesktop,
    // isTablet,
    isMobileMd,
    // isMobileSm,
  };
};