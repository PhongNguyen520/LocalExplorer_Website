import config from "../config";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

export const publicRoutes = [
      { path: config.routes.home, component: Home, layout: null },
     { path: config.routes.login, component: Login, layout: null },
     { path: config.routes.register, component: SignUp, layout: null },
     { path: config.routes.forgotPassword, component: ForgotPassword, layout: null },
     { path: config.routes.resetPassword, component: ResetPassword, layout: null },
]