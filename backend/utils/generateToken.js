const crypto = require('crypto');

const generatePasswordResetToken =  function() {
    return crypto.randomBytes(20).toString('hex');
}


module.exports = {
    generatePasswordResetToken,
}
