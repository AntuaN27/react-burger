import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED,
} from "../../actions/auth/login";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../actions/auth/tokens";
import {IRegisterData} from "../../../types";

const initialState = {
    loginRequest: false,
    loginFailed: false,
}

// @ts-ignore "sprint5"
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

interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const postLogin = (data: IRegisterData) => {
    // @ts-ignore "sprint5"
    return function(dispatch) {
        dispatch({
            type: POST_LOGIN_REQUEST
        });
        request<ILoginResponse>("/auth/login", {
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