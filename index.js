const express = require('express');
const port = 5100;
const app = express();
const sassMiddleware = require('node-sass-middleware');
//connecting to database
const db = require('./config/mongoose');

app.use(sassMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle:"compressed",
        prefix:'/css/',
    }
)
);
app.use(express.urlencoded());

//using layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extracting styles and sheets at top in head tag
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//setting template engine
app.set('view engine','ejs');
app.set('views','./views');
//make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//mongo store for storing session
const MongoStore = require('connect-mongo')(session);

//mongo store is used to store session cookie in DB
app.use(session(
    {
        name:'jaivik-jaayaka',
        //todo change the secret before deployment in production
        secret:'blahsomething',
        saveUninitialized:false,
        resave:false,
        cookie:
        {
            maxAge:(1000*60*100),  //number of milinutes in miliseconds
        },
        store: new MongoStore(
            {
                mongooseConnection:db,
                autoRemove:'disabled',
            },
            function(err)
            {
                if(err)
                {
                    console.log('Error in storing session');
                }
                console.log('Mongo Store Connected');
            }),
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using router
app.use('/',require('./routes/index.js'));

//using static files
app.use(express.static('./assets'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server');
        return;
    }
    console.log('Server is running and up at port ',port);
    return;
});