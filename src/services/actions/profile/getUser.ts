import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from "../../constants/profile/getUser"
import {IUserInfo} from "../../../types";

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS
    readonly payload: {
        userInfo: IUserInfo
    }
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED
}

export type TGetUserActions = IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction;