import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED
} from "../../constants/profile/patchUser";

export interface IPatchUserRequestAction {
    readonly type: typeof PATCH_USER_REQUEST
}

export interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS
}

export interface IPatchUserFailedAction {
    readonly type: typeof PATCH_USER_FAILED
}

export type TPatchUserActions = IPatchUserRequestAction
    | IPatchUserSuccessAction
    | IPatchUserFailedAction;