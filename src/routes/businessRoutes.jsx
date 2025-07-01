import config from "../config";
import BusinessLayout from "../layouts/BusinessLayout";
import Businesses from "../pages/Business/Businesses";
import BusinessEvents from "../pages/Business/BusinessEvents";
import BusinessFeedbacks from "../pages/Business/BusinessFeedbacks";
import BusinessImages from "../pages/Business/BusinessImages";
import BusinessLocation from "../pages/Business/BusinessLocation";
import BusinessOverview from "../pages/Business/BusinessOverview";
import BusinessReports from "../pages/Business/BusinessReports";
import BusinessServices from "../pages/Business/BusinessServices";
import CreateBusiness from "../pages/Business/CreateBusiness";
import Dashboard from "../pages/Business/Dashboard";
import Notifications from "../pages/Business/Notifications";
import Pricing from "../pages/Business/Pricing";
import Settings from "../pages/Business/Settings";
import PaymentSuccess from "../pages/Business/PaymentSuccess";
import PaymentCancel from "../pages/Business/PaymentCancel";

export const businessRoutes = [
     { path: config.routes.dashboardBusiness, component: Dashboard, layout: BusinessLayout },
     { path: config.routes.businesses, component: Businesses, layout: BusinessLayout },
     { path: config.routes.createBusiness, component: CreateBusiness, layout: BusinessLayout },
     { path: config.routes.businessOverview, component: BusinessOverview, layout: BusinessLayout },
     { path: config.routes.businessFeedbacks, component: BusinessFeedbacks, layout: BusinessLayout },
     { path: config.routes.businessEvents, component: BusinessEvents, layout: BusinessLayout },
     { path: config.routes.businessServices, component: BusinessServices, layout: BusinessLayout },
     { path: config.routes.businessImages, component: BusinessImages, layout: BusinessLayout },
     { path: config.routes.businessLocation, component: BusinessLocation, layout: BusinessLayout },
     { path: config.routes.pricing, component: Pricing, layout: BusinessLayout },
     { path: config.routes.businessReports, component: BusinessReports, layout: BusinessLayout },
     { path: config.routes.notifications, component: Notifications, layout: BusinessLayout },
     { path: config.routes.settings, component: Settings, layout: BusinessLayout },
     { path: config.routes.paymentSuccess, component: PaymentSuccess, layout: BusinessLayout },
     { path: config.routes.paymentCancel, component: PaymentCancel, layout: BusinessLayout },
]