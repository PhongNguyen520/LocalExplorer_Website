import React, { Fragment, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { businessRoutes } from "./routes/businessRoutes";
import { SidebarProvider } from "./contexts/SidebarContext";
import { publicRoutes } from "./routes";
import { AuthContext, AuthProvider } from "./providers/AuthProvider";
import { adminRoutes } from "./routes/adminRoutes";
import { CustomNotificationProvider } from "./providers/CustomNotificationProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

const AppContent = () => {
  const { auth, loading, accessToken } = useContext(AuthContext);

  if (loading) return <div />;
  const renderRoute = (route, index) => {
    const Layout = route.layout === null ? Fragment : route.layout;
    const Page = route.component;
    
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  };

  const getRoleRoutes = () => {
    if (auth?.roleName === "Business") return businessRoutes;
    if (auth?.roleName === "Admin") return adminRoutes;
    return publicRoutes;
  };

  const defaultRoute =
    auth?.roleName === "Business"
      ? businessRoutes[0].path
      : auth?.roleName === "Admin"
      ? adminRoutes[0].path
      : publicRoutes[0].path;

  return (
    
    <NotificationProvider accessToken={accessToken}>
    <Routes>
      {getRoleRoutes().map(renderRoute)}
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  </NotificationProvider>
  );
};

const App = () => {
  return (
    <div className="App">
      <CustomNotificationProvider>
        <AuthProvider>
          <SidebarProvider>
            <Router>
              <AppContent />
            </Router>
          </SidebarProvider>
        </AuthProvider>
      </CustomNotificationProvider>
    </div>
  );
};

export default App;
