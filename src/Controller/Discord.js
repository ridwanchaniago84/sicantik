import axios from 'axios';
import { config } from 'dotenv';

config();

const getData = async () => {
    const response = await axios.get(`${process.env.TenshiEndPoint}/api/memory-discord`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': process.env.Authorization
        }
    })
        .then((response) => {
            return response.data.msg;
        })
        .catch((error) => {
            console.log(error);
            return 'Shippai';
        });

    return response;
}

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
            return response.data.msg;
        })
        .catch((error) => {
            console.log(error);
            return 'Shippai';
        });

    return response;
}

export { changeToken, getData };
