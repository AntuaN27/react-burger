import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    MOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CART,
} from '../actions/burgerСonstructor';

const initialState = {
    burger_ingredients: [],
    count_ingredients: {},
}

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: [
                    ...state.burger_ingredients,
                    {...action.ingredient, uuid: action.ingredient_uuid}
                ]
            };
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burger_ingredients: state.burger_ingredients.filter(ingredient => ingredient.uuid !== action.ingredient_uuid)
            };
        }
        case INCREASE_COUNTER: {
            const ingredient_id = action.ingredient_id;
            const prevCount = state.count_ingredients[ingredient_id] || 0;
            return {
                ...state,
                count_ingredients: {
                    ...state.count_ingredients,
                    [ingredient_id]: prevCount + 1,
                }
            };
        }
        case DECREASE_COUNTER: {
            const ingredient_id = action.ingredient_id;
            const prevCount = state.count_ingredients[ingredient_id] || 0;
            return {
                ...state,
                count_ingredients: {
                    ...state.count_ingredients,
                    [ingredient_id]: Math.max(0, prevCount - 1), // Ограничение чтобы не выйти в минус
                }
            };
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const fillings = state.burger_ingredients.filter(i => i.type !== 'bun');
            const buns = state.burger_ingredients.filter(i => i.type === 'bun');

            const newFillings = [...fillings];
            const [moved] = newFillings.splice(action.fromIndex, 1);
            newFillings.splice(action.toIndex, 0, moved);

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