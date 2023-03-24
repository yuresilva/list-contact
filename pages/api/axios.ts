import axios from 'axios';

export const api =  axios.create({
    baseURL: 'http://teste-frontend.saperx.com.br/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
});
