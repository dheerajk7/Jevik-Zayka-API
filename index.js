const express = require('express');
const port = 8000;
const app = express();

//using router
app.use('/',require('./routes/index.js'));

//setting template engine
app.set('view engine','ejs');
app.set('views','./views');

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