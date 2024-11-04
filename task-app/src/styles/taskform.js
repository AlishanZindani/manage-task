// useStyles.js
import { makeStyles } from '@mui/styles'; // Make sure to install @mui/styles

const formStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'red',
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  formContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'50%',
    height:'60%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'lightBlue',
    borderRadius: '0.625rem',
    padding:'2rem'
  },
}));

export default formStyles;
