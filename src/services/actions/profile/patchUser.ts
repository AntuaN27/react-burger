import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED
} from "../../constants/profile/patchUser";
import {IUserInfo} from "../../../types";

export interface IPatchUserRequestAction {
    readonly type: typeof PATCH_USER_REQUEST
}

export interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS
    readonly payload: {
        userInfo: IUserInfo
    }
}

export interface IPatchUserFailedAction {
    readonly type: typeof PATCH_USER_FAILED
}

export type TPatchUserActions = IPatchUserRequestAction
    | IPatchUserSuccessAction
    | IPatchUserFailedAction;