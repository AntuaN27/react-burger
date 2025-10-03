import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILED,
} from "../../constants/auth/register";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../constants/auth/tokens";
import {IRegisterData} from "../../../types";
import {TRegisterActions} from "../../actions/auth/register";
import {AppDispatch, AppThunk} from "../../types";

type TRegisterState = {
    registerRequest: boolean,
    registerFailed: boolean
};

export const initialState: TRegisterState = {
    registerRequest: false,
    registerFailed: false,
}

export const register = (state = initialState, action: TRegisterActions): TRegisterState => {
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

export const postRegister = (data: IRegisterData): AppThunk => {
    return async function (dispatch: AppDispatch) {
        dispatch({
            type: POST_REGISTER_REQUEST
        });
        try {
            const res = await request<any>("/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            dispatch({
                type: POST_REGISTER_SUCCESS,
            });

            const accessTokenSplit = res.accessToken.split("Bearer ")[1]; // Без Bearer
            localStorage.setItem("accessToken", accessTokenSplit);
            localStorage.setItem("refreshToken", res.refreshToken);

            dispatch({
                type: SET_AUTH_TOKENS,
                payload: {
                    accessToken: accessTokenSplit,
                    refreshToken: res.refreshToken,
                }
            });
        } catch (error: unknown) {
            let message = "Неизвестная ошибка";

            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: POST_REGISTER_FAILED,
                payload: {
                    error: message
                }
            });
        }
    };
};