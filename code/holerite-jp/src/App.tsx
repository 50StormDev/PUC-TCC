import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import AuthChecker from "./components/auth/AuthChecker";
import Center from "./components/utils/Center";
import PersistentDrawerLeft from "./components/utils/Drawer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Center>
        <CircularProgress />
      </Center>
    );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <AuthChecker>
                    <route.component/>
                  </AuthChecker>
                ) : (
                  <PersistentDrawerLeft children={<route.component/>}/>
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
