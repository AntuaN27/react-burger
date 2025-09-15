import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
} from '../../constants/profile/patchUser';
import { createRequest } from "../../../utils/requestUtils";
import {IUserInfo} from "../../../types";
import {TPatchUserActions} from "../../actions/profile/patchUser";
import {AppDispatch, AppThunk} from "../../types";

type TPatchUserState = {
    patchUserRequest: boolean,
    patchUserFailed: boolean
}

const initialState: TPatchUserState = {
    patchUserRequest: false,
    patchUserFailed: false,
}

export const patchUser = (state = initialState, action: TPatchUserActions): TPatchUserState => {
    switch (action.type) {
        case PATCH_USER_REQUEST: {
            return {
                ...state,
                patchUserRequest: true,
            };
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: false,
            };
        }
        case PATCH_USER_FAILED: {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};

export const patchUserRequest = (data: IUserInfo): AppThunk => {
    return function(dispatch: AppDispatch) {
        const request = createRequest(dispatch);
        dispatch({
            type: PATCH_USER_REQUEST
        });
        request("/auth/user", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                dispatch({
                    type: PATCH_USER_SUCCESS,
                    payload: {
                        userInfo: res.user
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: PATCH_USER_FAILED,
                    payload: {
                        message: error.message,
                        status_code: error.status_code || null
                    }
                })
            });
    };
};