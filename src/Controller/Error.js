errorData = require('../Error/Error.json');

const errorMessage = (parameter) => {
    switch(parameter.parameter) {
        case 'error?':
            parameter.message.channel.send(`Oh itu mah error ${errorData.errorMesage} aja.`);
            break;
    }
}

exports.errorMessage = errorMessage