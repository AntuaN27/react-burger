import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED,
} from "../../actions/auth/logout";
import { request } from "../../../utils/requestUtils";
import {UNSET_AUTH_TOKENS} from "../../actions/auth/tokens";
import {IRefreshToken} from "../../../types";

const initialState = {
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
}

// @ts-ignore "sprint5"
export const logout = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case POST_LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: true,
                logoutFailed: false
            };
        }
        case POST_LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        }
        default: {
            return state;
        }
    }
}

interface ILogoutResponse {
  success: boolean;
}

export const postLogout = (data: IRefreshToken) => {
    // @ts-ignore "sprint5"
    return function(dispatch) {
        dispatch({
            type: POST_LOGOUT_REQUEST
        });
        return request<ILogoutResponse>("/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res && res.success) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({ type: POST_LOGOUT_SUCCESS });
                } else {
                    dispatch({ type: POST_LOGOUT_FAILED });
                }
                dispatch({type: UNSET_AUTH_TOKENS});
                return res;
            })
            .catch(error => {
                dispatch({
                    type: POST_LOGOUT_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
                dispatch({type: UNSET_AUTH_TOKENS});
            });
    };
};