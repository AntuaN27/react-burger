import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED
} from "../../constants/auth/login";

export interface IPostLoginRequestAction {
    readonly type: typeof POST_LOGIN_REQUEST
}

export interface IPostLoginSuccessAction {
    readonly type: typeof POST_LOGIN_SUCCESS
}

export interface IPostLoginFailedAction {
    readonly type: typeof POST_LOGIN_FAILED
}

export type TLoginActions = IPostLoginRequestAction
    | IPostLoginSuccessAction
    | IPostLoginFailedAction;