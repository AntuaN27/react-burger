import {createSelector} from "reselect";

// @ts-ignore "sprint5"
const getIngredients = (store) => store.burger_constructor.burger_ingredients || [];

export const getConstructorItems = createSelector(
    getIngredients,
    (ingredients) => ({
        ingredients
    }));

export const getPrice = createSelector(
    getIngredients,
    (ingredients = []) => {
        // @ts-ignore "sprint5"
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
        const counters = {};
        // @ts-ignore "sprint5"
        ingredients.forEach((ingredient) => {
            // @ts-ignore "sprint5"
            if (!counters[ingredient._id]) counters[ingredient._id] = 0;
            if (ingredient.type === "bun") {
                // @ts-ignore "sprint5"
                counters[ingredient._id] = 2;
            } else {
                // @ts-ignore "sprint5"
                counters[ingredient._id]++;
            }
        });
        return counters;
    }
)