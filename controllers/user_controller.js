const User = require('../models/user');
const path = require('path');
const fs = require('fs');

module.exports.creatUser = async function(request,response)
{
    try
    {
        let requestEmail = request.body.email.toLowerCase();
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
    if(request.isAuthenticated())
    {
        return response.redirect('/users/profile');
    }
    return response.render('sign-in',{
        title:'Sign In | JAIVIK JAAYAKA',
    });
}

module.exports.signUp = function(request,response)
{
    if(request.isAuthenticated())
    {
        return response.redirect('/users/profile');
    }
    return response.render('sign-up',{
        title:'Sign Up | JAIVIK JAAYAKA',
    });
}

module.exports.createSession = function(request,response)
{
    return response.redirect('/');
};

module.exports.signOut = function(request,response)
{
    request.logout();
    return response.redirect('/');
}

module.exports.profile = async function(request,response)
{
    try
    {
        let user = await User.findById(request.user.id);
        return response.render('profile',{
            title:'Profile | JAIVIK JAAYAKA',
            user_profile:user,
        });
    }
    catch(err)
    {
        console.log('Error in finding User for profile page');
        return;
    }
}

module.exports.edit = async function(request,response)
{
    try
    {
        let user = await User.findById(request.user.id);
        return response.render('edit-profile',{
            title:'Edit Profile | JAIVIK JAAYAKA',
            user_profile:user,
        });
    }
    catch(err)
    {
        console.log('Error in finding user for edit profile');
        return;
    }
}

module.exports.update = async function(request,response)
{
    try
    {
        let user = await User.findByIdAndUpdate(request.user.id).populate();
        let userExist = await User.findOne({email:request.user.email.toLowerCase()});
        if(userExist && userExist.id != request.user.id)
        {
            console.log('Email Exist');
            return response.redirect('back');
        }

        User.uploadAvatar(request,response,function(err)
            {
                if(err){console.log('Error in multer')};
                user.name = request.body.name;
                user.phone = request.body.phone;
                user.address = request.body.address;
                user.city = request.body.city;
                user.pincode = request.body.pincode;
                if(request.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + request.file.filename;
                }
                user.save();
                return response.redirect('/users/profile');
            });
    }
    catch(err)
    {
        console.log('Error in updating user profile',err);
        return;
    }
}