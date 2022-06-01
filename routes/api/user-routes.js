// require the express router
const router = require('express').Router();
// get all of the routes from the user controller
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');


// route for GET all and POST at (/api/users)
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// route to GET one, PUT and DELETE user at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

// export the router module for use of the routes
module.exports = router