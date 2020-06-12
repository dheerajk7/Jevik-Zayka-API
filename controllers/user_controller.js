const User = require('../models/user');

module.exports.creatUser = async function(request,response)
{
    try
    {
        let requestEmail = request.body.email.toLowerCase();
        console.log('print request',request.body);
        if(request.body.password != request.body.confirm_password)
        {
            request.flash('error','password does not matched');
            return response.redirect('back');
        }
        let user = await User.findOne({email:requestEmail});
        
        if(!user)
        {
            user =await  User.create(
                {
                    email:requestEmail,
                    password:request.body.password,
                    name:request.body.name,
                    phone:request.body.phone,
                    isAdmin:false,
                }
            );

            return response.redirect('/users/sign-in');
        }
        else
        {
            console.log("User exist");
            return response.redirect('/users/sign-in');
        }
    }
    catch(err)
    {
        console.log('Error in adding User',err);
        return;
    }
}


module.exports.signIn = function(request,response)
{
    return response.render('sign-in');
}

module.exports.signUp = function(request,response)
{
    return response.render('sign-up');
}

module.exports.createSession = function(request,response)
{
    console.log('Session created successfully');
    return response.redirect('/');
};

module.exports.signOut = function(request,response)
{
    console.log('SignOut successfully');
    request.logout();
    return response.redirect('/');
}