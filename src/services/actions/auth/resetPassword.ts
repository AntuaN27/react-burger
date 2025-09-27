import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_FAILED,
    RESET_RESET_PASSWORD
} from "../../constants/auth/resetPassword"

export interface IPostResetPasswordRequestAction {
    readonly type: typeof POST_RESET_PASSWORD_REQUEST
}

export interface IPostResetPasswordSuccessAction {
    readonly type: typeof POST_RESET_PASSWORD_SUCCESS
}

export interface IPostResetPasswordFailedAction {
    readonly type: typeof POST_RESET_PASSWORD_FAILED
}

export interface IResetResetPasswordAction {
    readonly type: typeof RESET_RESET_PASSWORD
}

export type TResetPasswordActions = IPostResetPasswordRequestAction
    | IPostResetPasswordSuccessAction
    | IPostResetPasswordFailedAction
    | IResetResetPasswordAction;