export interface IAuthData {
    password: string;
    token: string
}

export interface IRegisterData {
    email: string;
    password: string;
    name?: string;
}