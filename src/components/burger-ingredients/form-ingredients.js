import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './form-ingredient.module.css';
import IngredientDetails from "../modal/ingredient-details";
import Modal from '../modal/modal';
import {IngredientsCategory} from "./ingredients-category";
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
            payload: {
                ingredient: ingredient
            }
        })
    };

    const handleCloseModal = () => {
        dispatch({
            type: UNSET_MODAL_INGREDIENT
        })
    };

    const buns = useMemo(() =>
        ingredients.filter(ingredient => ingredient.type === "bun"),
        [ingredients]
    );
    const sauce = useMemo(() =>
        ingredients.filter(ingredient => ingredient.type === "sauce"),
        [ingredients]
    );
    const main = useMemo(() =>
        ingredients.filter(ingredient => ingredient.type === "main"),
        [ingredients]
    );

    return (
        <div className={styles.form} ref={scrollContainerRef}>
            <IngredientsCategory name={"Булки"} ingredients={buns} innerRef={bunRef} handleOpenModal={handleOpenModal} />
            <IngredientsCategory name={"Соусы"} ingredients={sauce} innerRef={sauceRef} handleOpenModal={handleOpenModal} />
            <IngredientsCategory name={"Начинки"} ingredients={main} innerRef={mainRef} handleOpenModal={handleOpenModal} />

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