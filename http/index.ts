import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../services/AuthService";

export const API_URL = `https://transport.infostrategic.com/api/v1`;

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});


$api.interceptors.request.use(async config => {
   config.headers.Authorization = `Bearer ${await AsyncStorage.getItem('token')}`;
   return config;
});
/*
$api.interceptors.response.use(async config => {
    return config;
}, (async error => {
    console.log(error);
}));*/

export default $api;