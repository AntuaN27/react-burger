import {
    POST_REFRESH_TOKEN_REQUEST,
    POST_REFRESH_TOKEN_SUCCESS,
    POST_REFRESH_TOKEN_FAILED,
} from "../../constants/auth/refreshToken";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../constants/auth/tokens";
import {IRefreshToken} from "../../../types";
import {TRefreshTokenActions} from "../../actions/auth/refreshToken";
import {AppDispatch, AppThunk} from "../../types";

type TRefreshTokenState = {
    refreshTokenRequest: boolean,
    refreshTokenFailed: boolean
}

const initialState: TRefreshTokenState = {
    refreshTokenRequest: false,
    refreshTokenFailed: false,
}

export const refreshToken = (state = initialState, action: TRefreshTokenActions): TRefreshTokenState => {
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

interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const postRefreshToken = (data: IRefreshToken): AppThunk => {
    return async function (dispatch: AppDispatch) {
        dispatch({
            type: POST_REFRESH_TOKEN_REQUEST
        });
        try {
            const res = await request<IRefreshTokenResponse>("/auth/token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            // сохраняем новые токены в localStorage
            const {accessToken, refreshToken} = res;
            const accessTokenSplit = accessToken.split("Bearer ")[1]; // Без Bearer
            localStorage.setItem("accessToken", accessTokenSplit);
            localStorage.setItem("refreshToken", refreshToken);

            dispatch({
                type: POST_REFRESH_TOKEN_SUCCESS,
            });

            dispatch({
                type: SET_AUTH_TOKENS,
                payload: {
                    accessToken: accessTokenSplit,
                    refreshToken: refreshToken,
                }
            });
            return res;
        } catch (error: unknown) {
            let message = "Неизвестная ошибка";

            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: POST_REFRESH_TOKEN_FAILED,
                payload: {
                    error: message
                }
            });
            return await Promise.reject(error);
        }
    };
};