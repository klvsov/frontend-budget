import {Box} from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const SkeletonTable = ({count}) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: '#121212',
          width: '100%',
          height: 56,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Skeleton sx={{flexGrow: 0.5, margin: "0 10px", padding: "0 16px", bgcolor: 'grey.100'}} variant="text"/>
        <Skeleton sx={{flexGrow: 1.5, margin: "0 10px", padding: "0 16px", bgcolor: 'grey.100'}} variant="text"/>
        {[...Array(count)].map((_, i) => <Skeleton key={i} sx={{
          flexGrow: 1,
          margin: "0 10px",
          padding: "0 16px",
          bgcolor: 'grey.100'
        }} variant="text"/>)
        }
      </Box>
      <Box
        sx={{
          bgcolor: '#0000000a',
          width: '100%',
          height: 73,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Skeleton sx={{flexGrow: 0.5, margin: "0 10px", padding: "0 16px", bgcolor: 'grey.900'}} variant="text"/>
        <Skeleton sx={{flexGrow: 1.5, margin: "0 10px", padding: "0 16px", bgcolor: 'grey.900'}} variant="text"/>
        {[...Array(count)].map((_, i) => <Skeleton key={i * 10}
                                                   sx={{
                                                     flexGrow: 1,
                                                     margin: "0 10px",
                                                     padding: "0 16px",
                                                     bgcolor: 'grey.900'
                                                   }} variant="text"/>)
        }
      </Box>
    </>
  )
};

export default SkeletonTable;