import {Token} from "./IToken";

export interface LoginResponse {
    message: string,
    error?: string,
    statusCode?: number,
    token?: Token
}