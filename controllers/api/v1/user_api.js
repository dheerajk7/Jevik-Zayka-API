const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createUser = async function(request,response)
{
   
}

module.exports.createSession = async function(request,response)
{
    try
    {
        let user = await User.findOne({email:request.body.email});
        if(!user || user.password != request.body.password)
        {
            return response.status(422).json({
                message:'Invalid Username and Password',
            });
        }
        else
        {
            return response.status(200).json(
                {
                    data:
                    {
                        token:jwt.sign(user.toJSON(),'jaivik-jaayaka',{expiresIn:'1000000'}),            //sending token after authentication
                    },
                    message:'Sign in Successfull',
                }
            );
        }
    }
    catch(err)
    {
        return response.status(500).json({
            message:'Internal Server Error',
        });
    }
};

module.exports.userProfile = function(request,response)
{
    let user_profile = {};
    user_profile['email'] = request.user.email;
    user_profile['name'] = request.user.name;
    user_profile['phone'] = request.user.phone;
    user_profile['address'] = request.user.address;
    user_profile['city'] = request.user.city;
    user_profile['pincode'] = request.user.pincode;
    user_profile['avatar'] = request.user.avatar;
    console.log(user_profile);
    return response.status(200).json(
        {
            data:
            {
                user_profile:user_profile,
            },
            message:'User Profile sent',
        }
    );
}