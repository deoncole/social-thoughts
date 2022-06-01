const {Thought, User} = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // get one thought by its id
    getThoughtById({params}, res){
        Thought.findOne({_id: params.thoughtId})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with that ID'})
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // add a new thought to the database
    createThought({params, body}, res){
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.username},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought with that ID found'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    // add a reaction to a thought
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with that ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // update a thought by its id
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: "No thought with that ID found"});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a thought from the database by its ID
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(deleteThought => {
                if(!deleteThought){
                    return res.status(404).json({message: 'No thought with that ID found'})
                }
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId}},
                    {new: true}
                );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with that ID'})
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },
    // delete a reaction
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId}}},
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }

}

module.exports = thoughtController;