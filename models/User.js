//  import the dependencies
const {Schema, model, default: mongoose} = require('mongoose');

// set up the Schema for the User
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Please insert a username",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

// get the total number of friends the user has
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
