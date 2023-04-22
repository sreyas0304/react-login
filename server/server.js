const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require("./config/keys");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./models/User");

const app = express();
const port = 4001;

app.use(cors({
    origin: 'http://localhost:3000'

})); // Use the CORS middleware
//app.use(express.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// DB Config
const db = require("./config/keys").MONGO_URL;

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
                first_name: user_data.first_name,
                last_name: "",
                mobile: "",
                auth_type: "FacebookLogin",
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


// const express = require('express');
// const app = express();
// const port = 8080;
// const passport = require('passport');
// const Strategy = require('passport-facebook').Strategy;
// const config = require('./config.js');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// app.use(cors());

// passport.use(new Strategy({
//   clientID: config.FACEBOOK_CLIENT_ID,
//   clientSecret: config.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/facebook/callback'
// },
// function(accessToken, refreshToken, profile, cb) {
//   // save the profile on the Database
//   // Save the accessToken and refreshToken if you need to call facebook apis later on
//   console.log(`User Profile ${profile}`)
//   return cb(null, profile);
// }));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'secret', resave: true, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/facebook', passport.authenticate('facebook'));
// app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: `${config.FRONTEND_HOST}/error`}), (req, res) => {
//   res.send(`${config.FRONTEND_HOST}/success`);
//   //res.json({ token: req.user.token });
// }) ;

// app.listen(port, () => {
//   console.log(`App is listening on ${port}`);
// })
