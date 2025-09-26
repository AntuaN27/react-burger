import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILED,
} from "../../constants/auth/forgotPassword";
import { request } from "../../../utils/requestUtils";
import {TForgotPasswordActions} from "../../actions/auth/forgotPassword";
import {AppDispatch, AppThunk} from "../../types";

type TForgotPasswordState = {
    forgotPasswordRequest: boolean,
    forgotPasswordSuccess: boolean,
    forgotPasswordFailed: boolean
};

const initialState: TForgotPasswordState = {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordFailed: false,
}

export const forgotPassword = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState => {
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

export const postForgotPassword = (email: string): AppThunk => {
    return function(dispatch: AppDispatch) {
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
            .catch((error: unknown) => {
                let message = "Неизвестная ошибка";

                if (error instanceof Error) {
                    message = error.message;
                }

                dispatch({
                    type: POST_FORGOT_PASSWORD_FAILED,
                    payload: {
                        error: message
                    }
                });
            });
    };
};