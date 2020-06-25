const Product = require('../../../models/product');

module.exports.getProducts = async function(request,response)
{
    try
    {
        let fruits = await Product.find({category:'Fruit'});
        let vegetables = await Product.find({category:'Vegetable'});

        return response.status(200).json(
            {
                data:
                {
                    fruits : fruits,
                    vegetables : vegetables,
                },
                message:'Product Fetched Successfully'
            }
        );
    }
    catch(err)
    {
        return response.status(500).json(
            {
                message:'Internal Server Error',
            }
        );
    }
}