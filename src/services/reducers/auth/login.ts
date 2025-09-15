import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED,
} from "../../constants/auth/login";
import { request } from "../../../utils/requestUtils";
import {SET_AUTH_TOKENS} from "../../constants/auth/tokens";
import {IRegisterData} from "../../../types";
import {TLoginActions} from "../../actions/auth/login";
import {AppDispatch, AppThunk} from "../../types";

type TLoginState = {
    loginRequest: boolean,
    loginFailed: boolean
};

const initialState: TLoginState = {
    loginRequest: false,
    loginFailed: false,
}

export const login = (state = initialState, action: TLoginActions): TLoginState => {
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

export const postLogin = (data: IRegisterData): AppThunk => {
    return function(dispatch: AppDispatch) {
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