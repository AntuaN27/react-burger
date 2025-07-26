import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './form-ingredient.module.css';
import Ingredient from "./ingredient";
import IngredientDetails from "../modal/ingredient-details";
import Modal from '../modal/modal';
import { SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT } from "../../services/actions/currentIngredient";

const FormIngredients = ({ bunRef, sauceRef, mainRef, setCurrentTab }) => {
    const dispatch = useDispatch();
    const modalIngredient = useSelector(store => store.current_ingredient.current_ingredient)
    const ingredients = useSelector(store => store.burger_ingredients.ingredients)
    const scrollContainerRef = useRef(null);

    const handleScroll = useCallback(() => {
        const containerTopPosition = scrollContainerRef.current.getBoundingClientRect().top;

        const bunTop = Math.abs(bunRef.current.getBoundingClientRect().top - containerTopPosition);
        const sauceTop = Math.abs(sauceRef.current.getBoundingClientRect().top - containerTopPosition);
        const mainTop = Math.abs(mainRef.current.getBoundingClientRect().top - containerTopPosition);

        const currentTabPosition = Math.min(bunTop, sauceTop, mainTop);

        if (currentTabPosition === bunTop) setCurrentTab("bun");
        else if (currentTabPosition === sauceTop) setCurrentTab("sauce");
        else setCurrentTab("main");
    }, [bunRef, mainRef, sauceRef, setCurrentTab])

    useEffect(() => {
        const container = scrollContainerRef.current;
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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

    const BlockWrapper = ({ name, ingredients, innerRef }) => (
        <div className={styles.block_wrapper} ref={innerRef}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <ul>
                {ingredients.map(ingredient => (
                <li key={ingredient._id} className={styles.card}>
                    <Ingredient
                        ingredient={ingredient}
                        openModal={() => handleOpenModal(ingredient)}
                    />
                </li>
            ))}
            </ul>
        </div>
    )

    return (
        <div className={styles.form} ref={scrollContainerRef}>
            <BlockWrapper name={"Булки"} ingredients={buns} innerRef={bunRef} />
            <BlockWrapper name={"Соусы"} ingredients={sauce} innerRef={sauceRef} />
            <BlockWrapper name={"Начинки"} ingredients={main} innerRef={mainRef} />

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