import $api from '../http';
import { AxiosResponse } from 'axios';
import {LoginResponse} from "../models/LoginResponse";
import {RegisterResponse} from "../models/RegisterResponse";
import {User} from "../models/IUser";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/login', {email, password});
    }

    static async register(email: string, password: string, type: string): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>('/auth/register', {email, password, type})
    }
    static async refresh(accessToken: string, refreshToken: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/refresh', {accessToken, refreshToken});
    }

    static async getUserData() : Promise<AxiosResponse<User>> {
        return $api.get<User>('/users/current');
    }

    static async sendReset(email: string) : Promise<AxiosResponse> {
        return $api.post('/auth/send_reset', {email});
    }

}