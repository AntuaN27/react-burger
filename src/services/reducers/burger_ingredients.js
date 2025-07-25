import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/burger_ingredients';
import { apiUrl } from "../../utils/variables";
import {ADD_CONSTRUCTOR_INGREDIENT, INCREASE_COUNTER, DECREASE_COUNTER, REMOVE_CONSTRUCTOR_INGREDIENT} from "../actions/burger_constructor";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

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
                ingredients: action.ingredients,
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

export const getBurgerIngredients = () => {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${apiUrl}/ingredients`)
        .then(res => res.json())
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        })
        .catch(error => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                error: error
            });
        });
    };
};

export const addIngredientWithValidation = (ingredient) => {
    return function(dispatch, getState) {
        const state = getState();
        const burgerIngredients = state.burger_constructor.burger_ingredients;

        if (burgerIngredients.length === 0) {
            if (ingredient.type !== "bun") {
                alert("Сначала выберите булочку!");
                return;
            }
        }

        if (ingredient.type === "bun" && burgerIngredients.find(ingredient => ingredient.type === "bun")) {
            const prevIngredient = burgerIngredients.find(ingredient => ingredient.type === "bun")
            dispatch({
                type: REMOVE_CONSTRUCTOR_INGREDIENT,
                ingredient_uuid: prevIngredient.uuid
            })
            dispatch({
                type: DECREASE_COUNTER,
                ingredient_id: prevIngredient._id
            })
        }

        dispatch({
            type: ADD_CONSTRUCTOR_INGREDIENT,
            ingredient: ingredient,
        })
        dispatch({
            type: INCREASE_COUNTER,
            ingredient_id: ingredient._id,
        })
    }
}