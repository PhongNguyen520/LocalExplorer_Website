import config from "../config";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const publicRoutes = [
      { path: config.routes.home, component: Home, layout: null },
     { path: config.routes.login, component: Login, layout: null },
     { path: config.routes.register, component: SignUp, layout: null },
]