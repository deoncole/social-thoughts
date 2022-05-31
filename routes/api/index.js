// require the router
const router = require('express').Router();
// require the routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add the /user prefix to the user routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes)

// export the module for the router
module.exports = router;