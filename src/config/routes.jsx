const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    dashboardBusiness: '/dashboard',
    businesses: '/businesses',
    createBusiness: '/business/create',
    businessOverview: '/business/:businessId',
    business: '/business',
    businessLocation: '/business/:businessId/location',
    businessReports: '/business/:businessId/reports',
    pricing: '/pricing',
    notifications: '/notifications',
    settings: '/settings',
    notFound: '*',
    // Admin routes
    adminDashboard: '/dashboard',
}

export default routes;