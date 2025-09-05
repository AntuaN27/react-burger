import { v4 as uuid } from 'uuid';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burgerIngredients';
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../actions/burgerСonstructor";
import { request } from "../../utils/requestUtils";
import {IIngredient} from "../../types";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

// @ts-ignore "sprint5"
export const burgerIngredients = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};

interface IGetIngredientsResponse {
  data: IIngredient[];
}

export const getBurgerIngredients = () => {
    // @ts-ignore "sprint5"
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        request<IGetIngredientsResponse>("/ingredients")
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: {
                        ingredients: res.data
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    payload: {
                        error: error
                    }
                })
            });
    };
};

export const addIngredientWithValidation = (ingredient: IIngredient) => {
    // @ts-ignore "sprint5"
    return function(dispatch, getState) {
        const state = getState();
        const burgerIngredients: IIngredient[] = state.burger_constructor.burger_ingredients;

        if (burgerIngredients.length === 0) {
            if (ingredient.type !== "bun") {
                alert("Сначала выберите булочку!");
                return;
            }
        }

        if (ingredient.type === "bun" && burgerIngredients.find(ingredient => ingredient.type === "bun")) {
            const prevIngredient = burgerIngredients.find(ingredient => ingredient.type === "bun")
            if (prevIngredient) {
                dispatch({
                    type: REMOVE_CONSTRUCTOR_INGREDIENT,
                    payload: {
                        ingredient_uuid: prevIngredient.uuid
                    }
                })
            }
        }

        dispatch({
            type: ADD_CONSTRUCTOR_INGREDIENT,
            payload: {
                ingredient: ingredient,
                ingredient_uuid: uuid(),
            }
        })
    }
}