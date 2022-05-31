// require the express router
const router = require('express').Router();
// get all of the routes from the thought controller
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller');

// route for GET all and POST at (/api/thoughts)
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)


router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// export the router module for use of the routes
module.exports = router;