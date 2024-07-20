const express = require("express");
const mongo = require('./data/database');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        reasave: false,
        saveUninitialized: true,
    }))

    .use(passport.initialize())

    .use(passport.session())
    
    app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,OPTIONS,DELETE,');
    next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT','PATCH']}))
    .use(cors({origin: '*'}))
    .use("/", require("./routes/index.js"));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function( accessToken, refreshToken,profile,done) {
        return done(null,profile);
    }));


passport.serializeUser((user, done) => {
        done(null,user);
});

passport.deserializeUser((user,done) => {
        done(null,user);
});

app.get('/', (req,res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github',{
        failureRedirect: '/api-docs', session: false}),
(req,res) => {
        req.session.user = req.user;
        res.redirect('/');
});

app.listen(port, () => {console.log(`DB is ready and Running on port ${port}`)});




