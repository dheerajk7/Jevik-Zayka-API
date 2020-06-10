const express = require('express');
const port = 8000;
const app = express();

//using layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extracting styles and sheets at top in head tag
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using router
app.use('/',require('./routes/index.js'));

//setting template engine
app.set('view engine','ejs');
app.set('views','./views');

//using static files
app.use(express.static('./assets'));

//connecting to database
const db = require('./config/mongoose');



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