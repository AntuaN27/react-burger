import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILED
} from "../../constants/auth/register";

export interface IPostRegisterRequestAction {
    readonly type: typeof POST_REGISTER_REQUEST
}

export interface IPostRegisterSuccessAction {
    readonly type: typeof POST_REGISTER_SUCCESS
}

export interface IPostRegisterFailedAction {
    readonly type: typeof POST_REGISTER_FAILED
}

export type TRegisterActions = IPostRegisterRequestAction
    | IPostRegisterSuccessAction
    | IPostRegisterFailedAction;