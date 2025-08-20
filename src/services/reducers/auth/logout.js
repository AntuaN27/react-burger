import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED,
    LOGOUT,
} from "../../actions/auth/logout";
import { request } from "../../../utils/requestUtils";
import {UNSET_AUTH_TOKENS} from "../../actions/auth/tokens";

const initialState = {
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
    logout: false,
}

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
        case LOGOUT: {
            return {
                ...state,
                logout: true
            }
        }
        default: {
            return state;
        }
    }
}

export const postLogout = (data) => {
    return function(dispatch) {
        dispatch({
            type: POST_LOGOUT_REQUEST
        });
        return request("/auth/logout", {
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
                    dispatch({type: UNSET_AUTH_TOKENS});
                    dispatch({ type: POST_LOGOUT_SUCCESS });
                } else {
                    dispatch({ type: POST_LOGOUT_FAILED });
                }
                return res;
            })
            .catch(error => {
                dispatch({
                    type: POST_LOGOUT_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
            });
    };
};