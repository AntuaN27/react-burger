import {
    POST_REFRESH_TOKEN_REQUEST,
    POST_REFRESH_TOKEN_SUCCESS,
    POST_REFRESH_TOKEN_FAILED
} from "../../constants/auth/refreshToken";

export interface IPostRefreshTokenRequestAction {
    readonly type: typeof POST_REFRESH_TOKEN_REQUEST
}

export interface IPostRefreshTokenSuccessAction {
    readonly type: typeof POST_REFRESH_TOKEN_SUCCESS
}

export interface IPostRefreshTokenFailedAction {
    readonly type: typeof POST_REFRESH_TOKEN_FAILED
}

export type TRefreshTokenActions = IPostRefreshTokenRequestAction
    | IPostRefreshTokenSuccessAction
    | IPostRefreshTokenFailedAction;