import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED,
} from "../../actions/auth/login";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../actions/auth/tokens";

const initialState = {
    loginRequest: false,
    loginFailed: false,
}

export const login = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false
            };
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        }
        default: {
            return state;
        }
    }
}

export const postLogin = (data) => {
    return function(dispatch) {
        dispatch({
            type: POST_LOGIN_REQUEST
        });
        request("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                dispatch({
                    type: POST_LOGIN_SUCCESS,
                })

                const accessTokenSplit = res.accessToken.split("Bearer ")[1]; // Без Bearer

                dispatch({
                    type: SET_AUTH_TOKENS,
                    payload: {
                        accessToken: accessTokenSplit,
                        refreshToken: res.refreshToken,
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: POST_LOGIN_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
            });
    };
};