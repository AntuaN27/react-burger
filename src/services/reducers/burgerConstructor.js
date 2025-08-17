import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CART,
} from '../actions/burgerСonstructor';

const initialState = {
    burger_ingredients: [],
}

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: [
                    ...state.burger_ingredients,
                    {...action.payload.ingredient, uuid: action.payload.ingredient_uuid}
                ]
            };
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: state.burger_ingredients.filter(ingredient => ingredient.uuid !== action.payload.ingredient_uuid)
            };
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const fillings = state.burger_ingredients.filter(i => i.type !== 'bun');
            const buns = state.burger_ingredients.filter(i => i.type === 'bun');

            const newFillings = [...fillings];
            const [moved] = newFillings.splice(action.payload.fromIndex, 1);
            newFillings.splice(action.payload.toIndex, 0, moved);

            return {
                ...state,
                burger_ingredients: [...buns, ...newFillings],
            };
        }
        case CLEAR_CART: {
            return {
                ...state,
                burger_ingredients: [],
                count_ingredients: {},
            }
        }
        default: {
            return state;
        }
    }
};