import React from 'react';
import { useSelector } from "react-redux";
import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient, openModal }) => {
    const burgerIngredients = useSelector(store =>
        store.burger_constructor.count_ingredients
    );
    const ingredientCounter = burgerIngredients[ingredient._id] || 0;
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
    })

    return (
        <div ref={el => {
            dragRef(el)
        }}>
            {ingredientCounter > 0 && (
                <Counter count={ingredientCounter} size="default" extraClass="m-1"/>
            )}
            <img
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.image_wrapper}
                onClick={openModal}
            />
            <div className={styles.price_wrapper}>
                <CurrencyIcon type="primary"/>
                <p>{ingredient.price}</p>
            </div>
            <button className={styles.name}>{ingredient.name}</button>
        </div>
    )
}

export default React.memo(Ingredient);