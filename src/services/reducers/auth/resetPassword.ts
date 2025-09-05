import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_FAILED,
    RESET_RESET_PASSWORD,
} from "../../actions/auth/resetPassword";
import { request } from "../../../utils/requestUtils";
import {IAuthData} from "../../../types";

const initialState = {
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
}

// @ts-ignore "sprint5"
export const resetPassword = (state = initialState, action) => {
    switch (action.type) {
        case POST_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            };
        }
        case POST_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: true,
                resetPasswordFailed: false
            };
        }
        case POST_RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            };
        }
        case RESET_RESET_PASSWORD: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const postResetPassword = (data: IAuthData) => {
    // @ts-ignore "sprint5"
    return function(dispatch) {
        dispatch({
            type: POST_RESET_PASSWORD_REQUEST
        });
        return request("/password-reset/reset", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                dispatch({
                    type: POST_RESET_PASSWORD_SUCCESS,
                })
            })
            .catch(error => {
                dispatch({
                    type: POST_RESET_PASSWORD_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
            });
    };
};