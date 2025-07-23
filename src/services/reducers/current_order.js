import { POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_FAILED, SET_MODAL_ORDER, UNSET_MODAL_ORDER } from "../actions/current_order";
import { apiUrl } from "../../utils/variables";

const initialState = {
    current_order: [],
    orderRequest: false,
    orderFailed: false,
}

export const currentOrder = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_ORDER: {
            return {
                ...state,
                current_order: [action.order],
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

export const postOrder = ({ ingredients }) => {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients })
        })
        .then(res => res.json())
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                })
                dispatch({
                    type: SET_MODAL_ORDER,
                    order: res.order,
                });
            } else {
                dispatch({
                    type: POST_ORDER_FAILED,
                });
            }
        })
        .catch(error => {
            dispatch({
                type: POST_ORDER_FAILED,
                error: error,
            })
        })
    }
};

export const orderValidation = ({ burgerIngredientsIds }) => {
    return function(dispatch, getState) {
        const state = getState();
        const burgerIngredients = state.burger_constructor.burger_ingredients;
        if (!burgerIngredients.length > 0) {
            alert("Выберите, пожалуйста, хотя бы 1 ингредиент");
        } else {
            dispatch(postOrder({ ingredients: burgerIngredientsIds }))
        }
    }
}