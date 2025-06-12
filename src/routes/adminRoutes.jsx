import config from "../config";
import AdminOverview from "../pages/Admin/AdminOverview";


export const adminRoutes = [
  { path: config.routes.adminDashboard, component: AdminOverview, layout: null },
];
