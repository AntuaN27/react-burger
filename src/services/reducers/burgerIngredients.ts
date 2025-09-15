import { v4 as uuid } from 'uuid';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../constants/burgerIngredients';
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../constants/burgerСonstructor";
import { request } from "../../utils/requestUtils";
import {TIngredient} from "../types/data";
import {TBurgerIngredientsActions} from "../actions/burgerIngredients";
import {AppDispatch, AppThunk, RootState} from "../types";

type TBurgerIngredientsState = {
    ingredients: ReadonlyArray<TIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
}

const initialState: TBurgerIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const burgerIngredients = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
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
  data: TIngredient[];
}

export const getBurgerIngredients = (): AppThunk => {
    return function(dispatch: AppDispatch) {
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

export const addIngredientWithValidation = (ingredient: TIngredient) => {
    return function(dispatch: AppDispatch, getState: () => RootState) {
        const state = getState();
        const burgerIngredients: TIngredient[] = state.burger_constructor.burger_ingredients;
        if (burgerIngredients.length === 0) {
            if (ingredient.type !== "bun") {
                alert("Сначала выберите булочку!");
                return;
            }
        }
        if (ingredient.type === "bun" && burgerIngredients.find(ingredient => ingredient.type === "bun")) {
            const prevIngredient = burgerIngredients.find(ingredient => ingredient.type === "bun")
            if (prevIngredient && prevIngredient.uuid) {
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