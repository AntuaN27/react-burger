import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
} from '../../constants/profile/getUser';
import { createRequest } from "../../../utils/requestUtils";
import {TGetUserActions} from "../../actions/profile/getUser";
import {AppDispatch, AppThunk} from "../../types";
import {IUserInfo} from "../../../types";

type TGetUserState = {
    userInfo: IUserInfo,
    userInfoRequest: boolean,
    userInfoFailed: boolean
}

const initialState: TGetUserState = {
    userInfo: {
        name: "",
        email: "",
    },
    userInfoRequest: false,
    userInfoFailed: false,
}

export const getUser = (state = initialState, action: TGetUserActions): TGetUserState => {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                userInfoRequest: true,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                userInfo: action.payload.userInfo,
                userInfoRequest: false,
                userInfoFailed: false,
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                userInfoRequest: false,
                userInfoFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};

export const getUserRequest = (): AppThunk => {
    return async function(dispatch: AppDispatch) {
        const request = createRequest(dispatch);

        dispatch({
            type: GET_USER_REQUEST
        });
        request("/auth/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then(res => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: {
                        userInfo: res.user
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_USER_FAILED,
                    payload: {
                        message: error.message,
                        status_code: error.status_code || null
                    }
                })
            });
    };
};