import {
    AUTH_TOKENS_REQUEST,
    SET_AUTH_TOKENS,
    UNSET_AUTH_TOKENS,
    AUTH_TOKENS_SUCCESS,
    AUTH_TOKENS_FAILED,
} from "../../constants/auth/tokens"

export interface IAuthTokensRequestAction {
    readonly type: typeof AUTH_TOKENS_REQUEST
}

export interface ISetAuthTokensAction {
    readonly type: typeof SET_AUTH_TOKENS
    readonly payload: {
        accessToken: string,
        refreshToken: string
    }
}

export interface IUnsetAuthTokensAction {
    readonly type: typeof UNSET_AUTH_TOKENS
}

export interface IAuthTokensSuccessAction {
    readonly type: typeof AUTH_TOKENS_SUCCESS
}

export interface IAuthTokensFailedAction {
    readonly type: typeof AUTH_TOKENS_FAILED
}

export type TTokensActions = IAuthTokensRequestAction
    | ISetAuthTokensAction
    | IUnsetAuthTokensAction
    | IAuthTokensSuccessAction
    | IAuthTokensFailedAction;