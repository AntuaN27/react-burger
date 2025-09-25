import {
    GET_ORDER_FAILED,
    GET_ORDER_FEED_SUCCESS,
    GET_ORDER_PROFILE_SUCCESS,
    GET_ORDER_REQUEST,
    POST_ORDER_FAILED,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    SET_FEED_MODAL_ORDER,
    SET_MODAL_ORDER,
    SET_PROFILE_MODAL_ORDER,
    UNSET_FEED_MODAL_ORDER,
    UNSET_MODAL_ORDER,
    UNSET_PROFILE_MODAL_ORDER,
} from "../constants/currentOrder";
import {TCurrentOrderActions} from "../actions/currentOrder";
import {CLEAR_CART} from "../constants/burgerСonstructor";
import {createRequest, request} from "../../utils/requestUtils";
import {TCurrentOrder, TOrderInfo} from "../types/data";
import {AppDispatch, AppThunk, RootState} from "../types";

type TCurrentOrderState = {
    currentOrder: TCurrentOrder,
    openOrderFeed: any,
    openOrderProfile: any,
    postOrderRequest: boolean,
    postOrderFailed: boolean,
    getOrderRequest: boolean,
    getOrderFailed: boolean,
}

const initialState: TCurrentOrderState = {
    currentOrder: [],
    openOrderFeed: null,
    openOrderProfile: null,
    postOrderRequest: false,
    postOrderFailed: false,
    getOrderRequest: false,
    getOrderFailed: false,
}

export const currentOrder = (state = initialState, action: TCurrentOrderActions): TCurrentOrderState => {
    switch (action.type) {
        case SET_MODAL_ORDER: {
            return {
                ...state,
                currentOrder: [action.payload.order],
            };
        }
        case UNSET_MODAL_ORDER: {
            return {
                ...state,
                currentOrder: [],
            };
        }
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                postOrderRequest: true,
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                postOrderRequest: false,
                postOrderFailed: false,
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                postOrderRequest: false,
                postOrderFailed: true,
            }
        }
        case SET_FEED_MODAL_ORDER: {
            return {
                ...state,
                openOrderFeed: action.payload.orderInfo,
            }
        }
        case UNSET_FEED_MODAL_ORDER: {
            return {
                ...state,
                openOrderFeed: null
            }
        }
        case SET_PROFILE_MODAL_ORDER: {
            return {
                ...state,
                openOrderProfile: action.payload.orderInfo,
            }
        }
        case UNSET_PROFILE_MODAL_ORDER: {
            return {
                ...state,
                openOrderProfile: null
            }
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                getOrderRequest: true,
            }
        }
        case GET_ORDER_FEED_SUCCESS: {
            return {
                ...state,
                openOrderFeed: action.payload.orderInfo,
                getOrderRequest: false,
                getOrderFailed: false,
            }
        }
        case GET_ORDER_PROFILE_SUCCESS: {
            return {
                ...state,
                openOrderProfile: action.payload.orderInfo,
                getOrderRequest: false,
                getOrderFailed: false,
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                getOrderRequest: false,
                getOrderFailed: true,
            }
        }
        default: {
            return state;
        }
    }
};

interface IPostOrderParams {
  ingredients: string[];
}

export const postOrder = ({ ingredients }: IPostOrderParams): AppThunk => {
    return function(dispatch: AppDispatch) {
        const request = createRequest(dispatch);
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        request("/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ ingredients })
        })
            .then(res => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                })
                dispatch({
                    type: SET_MODAL_ORDER,
                    payload: {
                        order: res.order,
                    }
                });
                dispatch({
                    type: CLEAR_CART,
                })
            })
            .catch(error => {
                dispatch({
                    type: POST_ORDER_FAILED,
                    payload: {
                        error: error,
                    }
                })
            })
    }
};

interface IOrderValidation {
    burgerIngredientsIds: string[];
}

// Решил оставить валидацию несмотря на проверку disabled у кнопки, так как это свойство можно вручную отключить и сломать приложение
export const orderValidation = ({ burgerIngredientsIds }: IOrderValidation) => {
    return function(dispatch: AppDispatch, getState: () => RootState) {
        const state = getState();
        const burgerIngredients = state.burgerConstructor.burger_ingredients;
        if (burgerIngredients.length === 0) {
            alert("Выберите, пожалуйста, хотя бы 1 ингредиент");
        } else {
            dispatch(postOrder({ ingredients: burgerIngredientsIds }))
        }
    }
}

export const findOrderById = (orderId: number, event: string): AppThunk<Promise<TOrderInfo>> => {
    return async function (dispatch: AppDispatch) {
        dispatch({ type: GET_ORDER_REQUEST });
        try {
            const res: any = await request(`/orders/${orderId}`);
            if (event === "feed") {
                dispatch({
                    type: GET_ORDER_FEED_SUCCESS,
                    payload: { orderInfo: res }
                });
            } else if (event === "profile") {
                dispatch({
                    type: GET_ORDER_PROFILE_SUCCESS,
                    payload: { orderInfo: res }
                });
            }
            return res;
        } catch (error) {
            dispatch({
                type: GET_ORDER_FAILED,
                payload: { error }
            });
            throw error;
        }
    }
}