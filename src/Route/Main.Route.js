const download = require('../Controller/Download').download;
const list = require('../Controller/List.File').list;

const route = (parameter) => {
    switch (parameter.command) {
        case 'download':
            download(parameter);
            break;
        case 'list':
            list(parameter);
            break;
        default:
            parameter.message.channel.send('Command not found');
    }
}

exports.route = route;
