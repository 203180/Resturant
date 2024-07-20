import {Box, CircularProgress, Typography} from "@mui/material";
import './loader.scss';

export const Loader = () => {
  return <Box id='loader'>
      <CircularProgress size='4rem' className='loading'/>
      <Typography variant='h6'>Fetching Data</Typography>
  </Box>
}