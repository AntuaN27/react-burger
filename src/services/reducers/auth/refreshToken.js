import {
    POST_REFRESH_TOKEN_REQUEST,
    POST_REFRESH_TOKEN_SUCCESS,
    POST_REFRESH_TOKEN_FAILED,
} from "../../actions/auth/refreshToken";
import { request } from "../../../utils/requestUtils";

const initialState = {
    refreshTokenRequest: false,
    refreshTokenFailed: false,
}

export const refreshToken = (state = initialState, action) => {
    switch (action.type) {
        case POST_REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true
            };
        }
        case POST_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: false
            };
        }
        case POST_REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true
            };
        }
        default: {
            return state;
        }
    }
}

export const postRefreshToken = (data) => {
    return function(dispatch) {
        dispatch({
            type: POST_REFRESH_TOKEN_REQUEST
        });
        return request("/auth/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                // сохраняем новые токены в localStorage
                const { accessToken, refreshToken } = res;
                localStorage.setItem("accessToken", accessToken.split("Bearer ")[1]); // Без Bearer
                localStorage.setItem("refreshToken", refreshToken);

                dispatch({
                    type: POST_REFRESH_TOKEN_SUCCESS,
                })

                return res;
            })
            .catch(error => {
                dispatch({
                    type: POST_REFRESH_TOKEN_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
                return Promise.reject(error);
            });
    };
};