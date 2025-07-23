import { combineReducers } from "redux";
import { burgerConstructor } from "./burger_constructor";
import { burgerIngredients } from "./burger_ingredients";
import { currentIngredient } from "./current_ingredient";
import { currentOrder } from "./current_order";

export const rootReducer = combineReducers({
    burger_ingredients: burgerIngredients,
    burger_constructor: burgerConstructor,
    current_ingredient: currentIngredient,
    current_order: currentOrder,
});