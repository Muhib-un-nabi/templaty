/* eslint-disable prettier/prettier */
const axios = require('axios');

export default axios.create({
  baseURL: '/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
});

export const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
