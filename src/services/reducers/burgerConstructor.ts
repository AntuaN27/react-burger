import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CART,
} from '../constants/burgerСonstructor';
import {TIngredient} from "../types/data";
import {TBurgerConstructorActions} from "../actions/burgerСonstructor";

type TBurgerConstructorState = {
    burger_ingredients: Array<TIngredient>,
};

const initialState: TBurgerConstructorState = {
    burger_ingredients: [],
}

export const burgerConstructor = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
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
                burger_ingredients: state.burger_ingredients.filter((ingredient: TIngredient) => ingredient.uuid !== action.payload.ingredient_uuid)
            };
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const fillings = state.burger_ingredients.filter((ingredient: TIngredient) => ingredient.type !== 'bun');
            const buns = state.burger_ingredients.filter((ingredient: TIngredient) => ingredient.type === 'bun');

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
            }
        }
        default: {
            return state;
        }
    }
};