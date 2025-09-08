import {
    AUTH_TOKENS_REQUEST,
    SET_AUTH_TOKENS,
    UNSET_AUTH_TOKENS,
    AUTH_TOKENS_SUCCESS,
    AUTH_TOKENS_FAILED,
} from "../../actions/auth/tokens";
import {getUserRequest} from "../profile/getUser";

const initialState = {
    authTokens: {},
    isLoggedIn: false,
    checkAuthTokensRequest: false,
    checkAuthTokensFailed: false,
}

// @ts-ignore "sprint5"
export const authTokens = (state = initialState, action) => {
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
    // @ts-ignore "sprint5"
    return async function(dispatch) {
        dispatch({ type: AUTH_TOKENS_REQUEST });
        try {
            // Вызов защищённого авторизацией адреса
            await dispatch(getUserRequest());

            dispatch({
                type: AUTH_TOKENS_SUCCESS
            });

        } catch (error: any) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            dispatch({
                type: UNSET_AUTH_TOKENS
            });

            dispatch({
                type: AUTH_TOKENS_FAILED,
                payload: error.message || "Не авторизован"
            });
        }
    }
}