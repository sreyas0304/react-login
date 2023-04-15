const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require("./config/keys");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./models/User_fb");

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3003'

})); // Use the CORS middleware
//app.use(express.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// DB Config
const db = require("./config/keys").mongoURI;

//console.log("Hello, " + db );
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(`MongoDB connection error: ${err}`));
   // .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(new FacebookStrategy({
    clientID: keys.FB_App_ID,
    clientSecret: keys.FB_App_secret,
    callbackURL: '/facebook_login/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {

        const user_data = { id: profile.id, name: profile.displayName, first_name: profile.first_name, email: profile.email, picture: profile.picture };
        let user = await User.findOne({ id: user_data.id });

        if (!user) {
            const newUser = new User({
                id: user_data.id,
                password: "NoPassword",
                email: user_data.email,
                first_name: user_data.name,
                last_name: "",
                mobile: "",
                auth_type: "GoogleLogin",
            });
            try {
                await newUser.save();
            } catch (err) {
                console.error(err);
            }

        }
        const token = jwt.sign({ name: user.name }, 'secret');
        console.log(user)
        return done(null, { user, token });
    } catch (err) {
        console.error(err);
        throw err;
        // res.status(500).json({ message: "Server Error" });
    }
}));

app.get('/facebook_login', passport.authenticate('facebook'));

app.get('/facebook_login/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    //res.json({ token: req.user.token });
    //res.json({ user_profile: req.user });
    console.log({
        success: true,
        token: "Bearer " + req.user.token
    })
    res.json({
        success: true,
        token: "Bearer " + req.user.token
    });
});

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

app.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({ message: "User has logged out" });
  });


app.listen(port, () => console.log(`Server listening on port ${port}`));