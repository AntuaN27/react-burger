import {createSelector} from "reselect";
import {RootState} from "../types";

const getIngredients = (store: RootState) => store.burger_constructor.burger_ingredients || [];

export const getConstructorItems = createSelector(
    getIngredients,
    (ingredients) => ({
        ingredients
    }));

export const getPrice = createSelector(
    getIngredients,
    (ingredients = []) => {
        return ingredients.reduce((sum, item) => {
            if (item.type === "bun") {
                return sum + item.price * 2;
            }
            return sum + item.price;
        }, 0);
    });

export const getIngredientsCounters = createSelector(
    getConstructorItems,
    ({ingredients}) => {
        const counters : any = {};
        ingredients.forEach((ingredient) => {
            if (!counters[ingredient._id]) counters[ingredient._id] = 0;
            if (ingredient.type === "bun") {
                counters[ingredient._id] = 2;
            } else {
                counters[ingredient._id]++;
            }
        });
        return counters;
    }
)