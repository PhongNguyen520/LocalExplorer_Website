import config from "../config/routes";
import AdminLayout from "../layouts/AdminLayout";
import UsersPage from "../pages/Admin/users";
import BusinessesPage from "../pages/Admin/businesses";
import TransactionsPage from "../pages/Admin/transactions";
import ReportsPage from "../pages/Admin/reports";
import FeedbackPage from "../pages/Admin/feedbacks";
import ActivitiesPage from "../pages/Admin/activities.";
import ServicesPage from "../pages/Admin/services";
import LocationsPage from "../pages/Admin/locations";
import EventsPage from "../pages/Admin/events";
import SchedulesPage from "../pages/Admin/schedules";
import SettingsPage from "../pages/Admin/settings";
import DashboardPage from "../pages/Admin/dashboard";
import NotificationsPage from "../pages/Admin/notifications";

export const adminRoutes = [
  { path: config.adminDashboard, component: DashboardPage, layout: AdminLayout },
  { path: config.adminUsers, component: UsersPage, layout: AdminLayout },
  { path: config.adminBusinesses, component: BusinessesPage, layout: AdminLayout },
  { path: config.adminTransactions, component: TransactionsPage, layout: AdminLayout },
  { path: config.adminReports, component: ReportsPage, layout: AdminLayout },
  { path: config.adminNotifications, component: NotificationsPage, layout: AdminLayout },
  { path: config.adminFeedbacks, component: FeedbackPage, layout: AdminLayout },
  { path: config.adminActivities, component: ActivitiesPage, layout: AdminLayout },
  { path: config.adminServices, component: ServicesPage, layout: AdminLayout },
  { path: config.adminLocations, component: LocationsPage, layout: AdminLayout },
  { path: config.adminEvents, component: EventsPage, layout: AdminLayout },
  { path: config.adminSchedules, component: SchedulesPage, layout: AdminLayout },
  { path: config.adminSettings, component: SettingsPage, layout: AdminLayout },
  // { path: config.adminAnalytics, component: AnalyticsPage, layout: AdminLayout },
];
