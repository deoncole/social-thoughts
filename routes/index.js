// require the express router
const router = require('express').Router();

// require the api routes
const apiRoutes = require('./api');

// add the /api prefix
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 Error!');
  });

// export the router
module.exports = router;