const axios = require('axios');

const listingFile = (files) => {
    let listFile = '';

    files.data.forEach((file, index) => {
        let message = file.type === 'directory' ? `
+ ${file.name}` : `
${file.name}`

        listFile += message;
    });

    const messageResult = '```' + listFile + '```';

    return messageResult;
}

const list = (parameter) => {
    axios.post('http://ztorrentdowloader.herokuapp.com/list-file', {
        folder: parameter.folder
    })
        .then((response) => {
            const listFile = listingFile(response);

            return listFile;
        })
        .then((responseFile) => {
            parameter.message.channel.send(responseFile);
        })
        .catch((error) => {
            parameter.message.channel.send('Shippai');
            console.error(error);
        });
}

exports.list = list;
