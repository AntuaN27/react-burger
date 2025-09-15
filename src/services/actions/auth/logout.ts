import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED
} from "../../constants/auth/logout";

export interface IPostLogoutRequestAction {
    readonly type: typeof POST_LOGOUT_REQUEST
}

export interface IPostLogoutSuccessAction {
    readonly type: typeof POST_LOGOUT_SUCCESS
}

export interface IPostLogoutFailedAction {
    readonly type: typeof POST_LOGOUT_FAILED
}

export type TLogoutActions = IPostLogoutRequestAction
    | IPostLogoutSuccessAction
    | IPostLogoutFailedAction;