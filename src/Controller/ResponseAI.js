const axios = require('axios');

const ResponseAI = (parameter) => {
    axios({
        method: 'post',
        url: 'https://tenshihinanai.000webhostapp.com/api/c3240bced4d9afdcdcb375fbdde8f3ad/tenshi',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            message: parameter.content,
            platform: 'discord'
        }
    })
        .then(response => {
            parameter.message.channel.send(response.data.result);
        })
        .catch(err => {
            console.error(err);
        });
}

exports.ResponseAI = ResponseAI;
