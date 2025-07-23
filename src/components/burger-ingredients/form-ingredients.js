import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './form-ingredient.module.css';
import Ingredient from "./ingredient";
import IngredientDetails from "../modal/ingredient-details";
import Modal from '../modal/modal';
import {SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT} from "../../services/actions/current_ingredient";

// const FormIngredients = ( {data, countsIngredients, onAdd, bunRef, sauceRef, mainRef} ) => {
const FormIngredients = ({ bunRef, sauceRef, mainRef }) => {
    const dispatch = useDispatch();
    const modalIngredient = useSelector(store => store.current_ingredient.current_ingredient)
    const ingredients = useSelector(store => store.burger_ingredients.ingredients)

    const handleOpenModal = (ingredient) => {
        dispatch({
            type: SET_MODAL_INGREDIENT,
            ingredient: ingredient
        })
    };

    const handleCloseModal = () => {
        dispatch({
            type: UNSET_MODAL_INGREDIENT
        })
    };

    const buns = ingredients.filter(ingredient => ingredient.type === "bun");
    const sauce = ingredients.filter(ingredient => ingredient.type === "sauce");
    const main = ingredients.filter(ingredient => ingredient.type === "main");

    const BlockWrapper = ({name, innerRef}) => (
        <div className={styles.block_wrapper} ref={innerRef}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <ul>
                {ingredients.map(ingredient => (
                <li key={ingredient._id} className={styles.card}>
                    <Ingredient
                        // image={ingredient.image}
                        // price={ingredient.price}
                        // name={ingredient.name}
                        ingredient={ingredient}
                        // count={countsIngredients[ingredient._id] || 0}
                        // onClick={() => onAdd(ingredient)}
                        onNameClick={() => handleOpenModal(ingredient)}
                    />
                </li>
            ))}
            </ul>
        </div>
    )

    return (
        <div className={styles.form}>
            <BlockWrapper name={"Булки"} data={buns} innerRef={bunRef} />
            <BlockWrapper name={"Соусы"} data={sauce} innerRef={sauceRef} />
            <BlockWrapper name={"Начинки"} data={main} innerRef={mainRef} />

            {modalIngredient.length > 0 && (
                <Modal
                    title={"Детали ингредиента"}
                    onClose={handleCloseModal}
                >
                    <IngredientDetails ingredient={modalIngredient[0]} />
                </Modal>
            )}
        </div>
    )
}

export default FormIngredients