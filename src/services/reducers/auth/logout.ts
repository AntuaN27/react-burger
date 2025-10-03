import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED,
} from "../../constants/auth/logout";
import { request } from "../../../utils/requestUtils";
import {UNSET_AUTH_TOKENS} from "../../constants/auth/tokens";
import {IRefreshToken} from "../../../types";
import {TLogoutActions} from "../../actions/auth/logout";
import {AppDispatch, AppThunk} from "../../types";

type TLogoutState = {
    logoutRequest: boolean,
    logoutSuccess: boolean,
    logoutFailed: boolean
};

export const initialState: TLogoutState = {
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
}

export const logout = (state = initialState, action: TLogoutActions): TLogoutState => {
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

export const postLogout = (data: IRefreshToken): AppThunk => {
    return async function (dispatch: AppDispatch) {
        dispatch({
            type: POST_LOGOUT_REQUEST
        });
        try {
            const res = await request<ILogoutResponse>("/auth/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (res && res.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({type: POST_LOGOUT_SUCCESS});
            } else {
                dispatch({type: POST_LOGOUT_FAILED});
            }
            dispatch({type: UNSET_AUTH_TOKENS});
            return res;
        } catch (error: unknown) {
            let message = "Неизвестная ошибка";

            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: POST_LOGOUT_FAILED,
                payload: {
                    error: message
                }
            });
            dispatch({type: UNSET_AUTH_TOKENS});
        }
    };
};