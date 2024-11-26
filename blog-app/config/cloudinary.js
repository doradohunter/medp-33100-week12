const cloudinary = require('cloudinary').v2;


async function connectToCloudinary() {
    // Configuration
    cloudinary.config({
        cloud_name: 'dkg091hsa',
        api_key: '723216436359913',
        api_secret: 'C_6wXGJESs0esGts7tPenheNKk0' // Click 'View API Keys' above to copy your API secret
    });

    return cloudinary;
}



module.exports = connectToCloudinary;
