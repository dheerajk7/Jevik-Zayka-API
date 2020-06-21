const { resolveInclude } = require("ejs")

module.exports.home = function(request,response)
{
    return response.render('home',{title:'Product | JAIVIK JAAYAKA'});
}