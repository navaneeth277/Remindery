import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatmate-backend-ptrw.onrender.com/api/chat', // Change to your deployed backend URL later
});

export default api;