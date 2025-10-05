import React from 'react';
import {useSelector} from "../../services/hooks";
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {getIngredientsCounters} from "../../services/selectors/constructor";
import {IIngredient} from "../../types";

interface IIngredientProps {
    ingredient: IIngredient;
    openModal: () => void;
}

const Ingredient: React.FC<IIngredientProps> = ({ingredient, openModal}) => {
    const selectedIngredients = useSelector(getIngredientsCounters);
    const ingredientCounter = selectedIngredients[ingredient._id]
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
    })

    return (
        <div
            data-test={`ingredient-${ingredient._id}`}
            ref={el => {
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