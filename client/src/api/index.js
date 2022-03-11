/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *  Axios to fetch 
 *  Here, instance will intercept in every request and provide token to a server
 */
import axios from 'axios';
import config from "../constants/config";

// creating instance
const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});
// intercepting every requests
instance.interceptors.request.use(async (config) => {
    // retreiving accessToken
    const accessToken = JSON.parse(window.localStorage.getItem('access'));
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.ContentType = 'application/json';
    return config;
}); 

export default instance;

