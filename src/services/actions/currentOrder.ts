import {
    SET_MODAL_ORDER,
    UNSET_MODAL_ORDER,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_FEED_SUCCESS,
    GET_ORDER_PROFILE_SUCCESS,
    GET_ORDER_FAILED,
    SET_FEED_MODAL_ORDER,
    UNSET_FEED_MODAL_ORDER,
    SET_PROFILE_MODAL_ORDER,
    UNSET_PROFILE_MODAL_ORDER
} from "../constants/currentOrder";
import {TCurrentOrder, TOrderDetails} from "../types/data";

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

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFeedSuccessAction {
    readonly type: typeof GET_ORDER_FEED_SUCCESS;
    readonly payload: {
        orderInfo: TOrderDetails
    }
}

export interface IGetOrderProfileSuccessAction {
    readonly type: typeof GET_ORDER_PROFILE_SUCCESS;
    readonly payload: {
        orderInfo: TOrderDetails
    }
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface ISetFeedModalOrder {
    readonly type: typeof SET_FEED_MODAL_ORDER;
    readonly payload: {
        orderInfo: TOrderDetails;
    }
}

export interface IUnsetFeedModalOrder {
    readonly type: typeof UNSET_FEED_MODAL_ORDER
}


export interface ISetProfileModalOrder {
    readonly type: typeof SET_PROFILE_MODAL_ORDER;
    readonly payload: {
        orderInfo: TOrderDetails;
    }
}

export interface IUnsetProfileModalOrder {
    readonly type: typeof UNSET_PROFILE_MODAL_ORDER
}

export type TCurrentOrderActions = ISetModalOrderAction
    | IUnsetModalOrderAction
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailedAction
    | IGetOrderRequestAction
    | IGetOrderFeedSuccessAction
    | IGetOrderProfileSuccessAction
    | IGetOrderFailedAction
    | ISetFeedModalOrder
    | IUnsetFeedModalOrder
    | ISetProfileModalOrder
    | IUnsetProfileModalOrder;