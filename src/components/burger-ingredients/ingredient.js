import React from 'react';
import { useDispatch } from "react-redux";
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {addIngredientWithValidation} from "../../services/reducers/burger_ingredients";

// const Ingredient = ({image, price, name, count, onClick, onNameClick}) => {
const Ingredient = ({ingredient, onNameClick}) => {
    const dispatch = useDispatch();

    const addIngredient = () => {
        dispatch(addIngredientWithValidation(ingredient))
    };

    return (
        <>
            {/*{count > 0 && (*/}
            {/*    <Counter count={count} size="default" extraClass="m-1"/>*/}
            {/*)}*/}
            <img src={ingredient.image} alt={ingredient.name} className={styles.image_wrapper} onClick={addIngredient} />
            <div className={styles.price_wrapper}>
                <CurrencyIcon type="primary"/>
                <p>{ingredient.price}</p>
            </div>
            <button className={styles.name} onClick={onNameClick}>{ingredient.name}</button>
        </>
    )
}

export default React.memo(Ingredient);