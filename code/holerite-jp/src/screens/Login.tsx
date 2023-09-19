import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { Copyright } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../hooks'
import { UserState } from '../intefaces/ user';
import { setAuthCredential } from '../store/user/userSlice';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const user: UserState = useAppSelector((state: {user: UserState}) => state.user)
  const dispatch = useAppDispatch()
  console.log("this is the user", user)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [credential, setCredential] = React.useState({email:"", password:""})
  
  const handleOnChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setCredential({ ...credential, [name]: value });
    console.log(credential)
  };
  const load = async(email:string) => {
    const querySnapshot = await getDocs(collection(db, "metas"));
    querySnapshot.forEach((response: any) => {
      let res = response.data()
      if(res.email === email)
      {if(res.setup == false){
        navigate("");
      } else{
        navigate("")              
      }}
    })
  }
  const auth = getAuth();
  const handleLogin = () =>{
      signInWithEmailAndPassword(auth, credential.email, credential.password)
      .then((userCredential) => {
        // Signed in 
        const found_user = userCredential.user;
        if(found_user.uid && found_user.email){
          dispatch(setAuthCredential({id: found_user.uid, email: found_user.email}))
        }
        navigate("/home")
        localStorage.setItem('email',found_user.email!)
        load(user.email!)
      })
      .catch((error) => {
        navigate("/home")
        const errMessage = error.message;
        setErrorMessage(errMessage)
        console.log(errorMessage)
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright/>
      </Container>
    </ThemeProvider>
  );
}
