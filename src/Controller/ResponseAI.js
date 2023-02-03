import axios from 'axios';
import { config } from 'dotenv';

config();
const authorization = process.env.Authorization;

const ResponseAI = (parameter) => {
    axios({
        method: 'post',
        url: `${process.env.TenshiEndPoint}/api/tenshi`,
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

export default ResponseAI;
