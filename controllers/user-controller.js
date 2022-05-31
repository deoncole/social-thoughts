// require the user model
const { User } = require('../models');

// set up the controller that will define the functions for the routes
const userController = {
    // find all of the users using the find method
    getAllUsers(req, res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // get one user by their id using the findOne method
    getUserById({params}, res){
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with that ID'})
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // add a new user to the database
    createUser({body}, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // update a user by their id using the findOneAndUpdate method
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user with that ID found!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a user from the database using the findOneAndDelete method
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message:'No User found with that ID'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    }
};

module.exports = userController;
