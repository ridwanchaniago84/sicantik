const fs = require('fs');
const path = require('path');

const saveError = (errorMessage) => {
    const obj = { errorMesage: errorMessage.message };
    fs.writeFileSync(path.resolve(__dirname, 'Error.json'), JSON.stringify(obj));
}

exports.saveError = saveError;
