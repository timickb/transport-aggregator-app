import {Token} from "../models/IToken";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios, {AxiosResponse} from "axios";
import {LoginResponse} from "../models/LoginResponse";
import {RegisterResponse} from "../models/RegisterResponse";
import {User} from "../models/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Store {
    user = {} as User;
    token = {} as Token;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    setAuth(value: boolean) {
        this.isAuth = value;
    }

    setUser(user: User) {
        this.user = user;
    }

    setToken(token: Token) {
        this.token = token;
    }

    async getUserData() {
        try {
            const response = await AuthService.getUserData();
            this.setUser(response.data);
        } catch (e) {

        }
    }

    async login(email: string, password: string) : Promise<LoginResponse> {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            await AsyncStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
            this.setToken(response.data.token);
            await this.getUserData();
            console.log("Logged successfully");
            this.setLoading(false);
            return response.data;
        } catch(e) {
            // console.log(e.response?.data?.message);
        }
    }

    async register(email: string, password: string) : Promise<RegisterResponse> {
        try {
            console.log("Here")
            const response = await AuthService.register(email, password, "passenger");
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        await AsyncStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({} as User);
        this.setToken({} as Token);
    }

    async refreshToken() {
        try {
            const response = await AuthService.refresh(this.token.accessToken, this.token.refreshToken);
            this.setToken(response.data.token);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async sendReset(email: string) {
       return await AuthService.sendReset(email);
    }
}