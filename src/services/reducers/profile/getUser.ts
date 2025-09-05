import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
} from '../../actions/profile/getUser';
import { createRequest } from "../../../utils/requestUtils";

const initialState = {
    userInfo: {},
    userInfoRequest: false,
    userInfoFailed: false,
}

// @ts-ignore "sprint5"
export const getUser = (state = initialState, action) => {
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

export const getUserRequest = () => {
    // @ts-ignore "sprint5"
    return function(dispatch) {
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