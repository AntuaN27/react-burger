import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from '../actions/burger_constructor';

const initialState = {
    burger_ingredients: [],
}

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: [...state.burger_ingredients, action.ingredient]
            };
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: state.burger_ingredients.filter(ingredient => ingredient._id !== action.id)
            };
        }
        default: {
            return state;
        }
    }
};