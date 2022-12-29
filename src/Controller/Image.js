import axios from 'axios';
import { config } from 'dotenv';

config();

const imageOpenAI = async (promp) => {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: promp,
        n: 1,
        size: "1024x1024"
    }, {
        headers: {
            Authorization: 'Bearer ' + process.env.OpenAIKey
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

export default imageOpenAI;
