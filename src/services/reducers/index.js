import { combineReducers } from "redux";
import { burgerConstructor } from "./burgerConstructor";
import { burgerIngredients } from "./burgerIngredients";
import { currentIngredient } from "./currentIngredient";
import { currentOrder } from "./currentOrder";

export const rootReducer = combineReducers({
    burger_ingredients: burgerIngredients,
    burger_constructor: burgerConstructor,
    current_ingredient: currentIngredient,
    current_order: currentOrder,
});