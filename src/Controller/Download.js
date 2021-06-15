const axios = require('axios');

const download = (parameter) => {
    switch (parameter.type) {
        case '-t':
            axios.post('https://ztorrentdowloader.herokuapp.com/add-magnet', {
                magnet: parameter.url
            })
                .then(() => {
                    parameter.message.channel.send('Check your file ini here: https://ztorrentdowloader.herokuapp.com/file');
                })
                .catch((error) => {
                    parameter.message.channel.send('Shippai');
                });

            parameter.message.channel.send('Check your file ini here: https://ztorrentdowloader.herokuapp.com/file');
            break;
        default:
            parameter.message.channel.send('Command not found');
    }
}

exports.download = download;
