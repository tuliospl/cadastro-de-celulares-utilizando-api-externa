import axios from 'axios';

const api = axios.create({
  baseURL: 'https://phones--melhorcom.repl.co/phone',
});

export default api;
