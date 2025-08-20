import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILED,
} from "../../actions/auth/register";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../actions/auth/tokens";

const initialState = {
    registerRequest: false,
    registerFailed: false,
}

export const register = (state = initialState, action) => {
    switch (action.type) {
        case POST_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case POST_REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: false
            };
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            };
        }
        default: {
            return state;
        }
    }
}

export const postRegister = (data) => {
    return function(dispatch) {
        dispatch({
            type: POST_REGISTER_REQUEST
        });
        return request("/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                dispatch({
                    type: POST_REGISTER_SUCCESS,
                })
                dispatch({
                    type: SET_AUTH_TOKENS,
                    payload: {
                        accessToken: res.accessToken,
                        refreshToken: res.refreshToken,
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: POST_REGISTER_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
            });
    };
};