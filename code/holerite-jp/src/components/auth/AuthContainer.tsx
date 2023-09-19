import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";

import Center from "../utils/Center";
import { db } from "../../config/firebase";

interface Props {
  action: string
}

const AuthContainer = (props: Props) => {
  console.log(props.action)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credential, setCredential] = useState({email:"", password:""})
  
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
        const user = userCredential.user;
        localStorage.setItem('email',user.email!)
        load(user.email!)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage)
      });
  }
  return (
    <Center height={"auto"}>
      <form  noValidate autoComplete="off">
      <Card >
        <CardHeader title={ "Fazer Login"} />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              name="email"
              onChange={handleOnChange}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              name="password"
              onChange={handleOnChange}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}>
            Entrar
          </Button>
        </CardActions>
      </Card>
    </form>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default AuthContainer;

