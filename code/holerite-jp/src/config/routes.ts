import Dashboard from "../screens/Dashboard";
import SignIn from "../screens/Login";
import Home from "../screens/Perfil";
import SmartForm from "../screens/Simulador";
import TimeCard from "../screens/TimeCard";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "/login",
    component: SignIn,
    name: "/Login",
    protected: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "/Dashboard",
    protected: false,
  },
  {
    path: "/time-card",
    component: TimeCard,
    name: "/TimeCard",
    protected: false,
  },
  {
    path: "/home",
    component: Home,
    name: "/Home",
    protected: false,
  },
  {
    path: "/simulador",
    component: SmartForm,
    name: "/Simulador",
    protected: false,
  },
  
];

export default routes;
