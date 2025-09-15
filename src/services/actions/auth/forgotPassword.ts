import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILED,
} from "../../constants/auth/forgotPassword";

export interface IPostForgotPasswordRequestAction {
    readonly type: typeof POST_FORGOT_PASSWORD_REQUEST
}

export interface IPostForgotPasswordSuccessAction {
    readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS
}

export interface IPostForgotPasswordFailedAction {
    readonly type: typeof POST_FORGOT_PASSWORD_FAILED
}

export type TForgotPasswordActions = IPostForgotPasswordRequestAction
    | IPostForgotPasswordSuccessAction
    | IPostForgotPasswordFailedAction;