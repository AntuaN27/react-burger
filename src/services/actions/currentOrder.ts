import {
    SET_MODAL_ORDER,
    UNSET_MODAL_ORDER,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from "../constants/currentOrder";
import {TCurrentOrder} from "../types/data";

// Типизация экшенов
export interface ISetModalOrderAction {
    readonly type: typeof SET_MODAL_ORDER;
    readonly payload: {
        order: TCurrentOrder;
    }
}

export interface IUnsetModalOrderAction {
    readonly type: typeof UNSET_MODAL_ORDER;
}

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
}

export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export type TCurrentOrderActions = ISetModalOrderAction
    | IUnsetModalOrderAction
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailedAction;