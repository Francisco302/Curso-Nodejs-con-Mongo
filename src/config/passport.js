// File for the  configuration of the Signin
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Defining a new authentication strategy
passport.use(new LocalStrategy(
    {
        usernameField: "email",
    },
    async (email, password, done) => {
        // Match Email's User
        const user = await User.findOne({ email: email });


        if (!user) {
            return done(null, false, { message: "Not User found." });
        }

        // Match Password's User
        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return done(null, false, { message: "Incorrect Password." });
        console.log(user.name);
        return done(null, user);
    }
));

// To Save in session the  user's id
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// If is already an user in the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})