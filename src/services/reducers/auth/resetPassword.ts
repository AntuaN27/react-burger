import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_FAILED,
    RESET_RESET_PASSWORD,
} from "../../constants/auth/resetPassword";
import { request } from "../../../utils/requestUtils";
import {IAuthData} from "../../../types";
import {TResetPasswordActions} from "../../actions/auth/resetPassword";
import {AppDispatch, AppThunk} from "../../types";

type TResetPasswordState = {
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordFailed: boolean
};

export const initialState: TResetPasswordState = {
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
}

export const resetPassword = (state = initialState, action: TResetPasswordActions): TResetPasswordState => {
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

export const postResetPassword = (data: IAuthData): AppThunk => {
    return async function (dispatch: AppDispatch) {
        dispatch({
            type: POST_RESET_PASSWORD_REQUEST
        });
        try {
             await request("/password-reset/reset", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(data)
            });
            dispatch({
                type: POST_RESET_PASSWORD_SUCCESS,
            });
        } catch (error: unknown) {
            let message = "Неизвестная ошибка";

            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: POST_RESET_PASSWORD_FAILED,
                payload: {
                    error: message
                }
            });
        }
    };
};