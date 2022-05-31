// require the router
const router = require('express').Router();
// require the routes
const userRoutes = require('./user-routes');

// add the /user prefix to the user routes
router.use('/users', userRoutes);

// export the module for the router
module.exports = router;