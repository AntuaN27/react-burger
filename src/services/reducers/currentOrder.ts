import {
    SET_MODAL_ORDER,
    UNSET_MODAL_ORDER,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from "../constants/currentOrder";
import { TCurrentOrderActions } from "../actions/currentOrder";
import { CLEAR_CART } from "../constants/burgerСonstructor";
import {createRequest} from "../../utils/requestUtils";
import {TCurrentOrder} from "../types/data";
import {AppDispatch, AppThunk, RootState} from "../types";

type TCurrentOrderState = {
    current_order: TCurrentOrder,
    orderRequest: boolean,
    orderFailed: boolean,
}

const initialState: TCurrentOrderState = {
    current_order: [],
    orderRequest: false,
    orderFailed: false,
}

export const currentOrder = (state = initialState, action: TCurrentOrderActions): TCurrentOrderState => {
    switch (action.type) {
        case SET_MODAL_ORDER: {
            return {
                ...state,
                current_order: [action.payload.order],
            };
        }
        case UNSET_MODAL_ORDER: {
            return {
                ...state,
                current_order: [],
            };
        }
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
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
        const burgerIngredients = state.burger_constructor.burger_ingredients;
        if (burgerIngredients.length === 0) {
            alert("Выберите, пожалуйста, хотя бы 1 ингредиент");
        } else {
            dispatch(postOrder({ ingredients: burgerIngredientsIds }))
        }
    }
}