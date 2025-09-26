import {
    AUTH_TOKENS_REQUEST,
    SET_AUTH_TOKENS,
    UNSET_AUTH_TOKENS,
    AUTH_TOKENS_SUCCESS,
    AUTH_TOKENS_FAILED,
} from "../../constants/auth/tokens";
import {getUserRequest} from "../profile/getUser";
import {TTokensActions} from "../../actions/auth/tokens";
import {AppDispatch} from "../../types";

type TTokensState = {
    authTokens: {
        accessToken?: string,
        refreshToken?: string,
    },
    isLoggedIn: boolean,
    checkAuthTokensRequest: boolean,
    checkAuthTokensFailed: boolean
}

const initialState: TTokensState = {
    authTokens: {},
    isLoggedIn: false,
    checkAuthTokensRequest: false,
    checkAuthTokensFailed: false,
}

export const authTokens = (state = initialState, action: TTokensActions): TTokensState => {
    switch (action.type) {
        case AUTH_TOKENS_REQUEST: {
            return {
                ...state,
                checkAuthTokensRequest: true
            }
        }
        case SET_AUTH_TOKENS: {
            return {
                ...state,
                authTokens: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                },
                isLoggedIn: true,
            };
        }
        case UNSET_AUTH_TOKENS: {
            return initialState;
        }
        case AUTH_TOKENS_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                checkAuthTokensRequest: false,
            }
        }
        case AUTH_TOKENS_FAILED: {
            return {
                ...state,
                isLoggedIn: false,
                checkAuthTokensRequest: false,
                checkAuthTokensFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}

export const checkAuthTokens = () => {
    return async function(dispatch: AppDispatch) {
        dispatch({ type: AUTH_TOKENS_REQUEST });
        try {
            // Вызов защищённого авторизацией адреса
            dispatch(getUserRequest());

            dispatch({
                type: AUTH_TOKENS_SUCCESS
            });

        } catch (error: unknown) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            let message = "Неизвестная ошибка";

            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: UNSET_AUTH_TOKENS
            });

            dispatch({
                type: AUTH_TOKENS_FAILED,
                payload: message
            });
        }
    }
}