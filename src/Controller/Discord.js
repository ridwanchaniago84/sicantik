import axios from 'axios';
import { config } from 'dotenv';

config();

const changeToken = async (token) => {
    const response = await axios.post(`${process.env.TenshiEndPoint}/api/token-discord`, {
        token: token
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': process.env.Authorization
        }
    })
        .then((response) => {
            // console.log(response.data);
            // console.log(response.data.data[0].url);
            return response.data.data[0].url;
        })
        .catch(() => {
            return 'Shippai';
        });

    return response;
}

export { changeToken };
