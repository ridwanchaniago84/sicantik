const axios = require('axios');
const authorization = process.env.Authorization;

const ResponseAI = (parameter) => {
    axios({
        method: 'post',
        url: 'https://tenshihinanai.000webhostapp.com/api/tenshi',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authorization
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
