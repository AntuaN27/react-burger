import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILED,
} from "../../actions/auth/forgotPassword";
import { request } from "../../../utils/requestUtils";

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordFailed: false,
}

export const forgotPassword = (state = initialState, action) => {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            };
        }
        case POST_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
                forgotPasswordFailed: false
            };
        }
        case POST_FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false,
                forgotPasswordFailed: true
            };
        }
        default: {
            return state;
        }
    }
}

export const postForgotPassword = ({ email }) => {
    return function(dispatch) {
        dispatch({
            type: POST_FORGOT_PASSWORD_REQUEST
        });
        request("/password-reset", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
            .then(res => {
                dispatch({
                    type: POST_FORGOT_PASSWORD_SUCCESS,
                })
            })
            .catch(error => {
                dispatch({
                    type: POST_FORGOT_PASSWORD_FAILED,
                    payload: {
                        error: error.message || "Неизвестная ошибка"
                    }
                });
            });
    };
};