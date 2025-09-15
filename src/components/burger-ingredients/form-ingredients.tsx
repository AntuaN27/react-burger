import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from "../../services/hooks";
import styles from './form-ingredient.module.css';
import IngredientDetails from "../modal/ingredient-details";
import Modal from '../modal/modal';
import {IngredientsCategory} from "./ingredients-category";
import {SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT} from "../../services/constants/currentIngredient";
import {useLocation, useNavigate} from "react-router-dom";
import {IIngredient, TabType} from "../../types";

interface IFormIngredients {
    bunRef: React.RefObject<HTMLDivElement | null>;
    sauceRef: React.RefObject<HTMLDivElement | null>;
    mainRef: React.RefObject<HTMLDivElement | null>;
    setCurrentTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const FormIngredients: React.FC<IFormIngredients> = ({ bunRef, sauceRef, mainRef, setCurrentTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const modalIngredient: IIngredient | null = useSelector(store => store.current_ingredient.current_ingredient);
    const ingredients = useSelector(store => store.burger_ingredients.ingredients);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current || !bunRef.current || !sauceRef.current || !mainRef.current) return;

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

        if (!container) return;

        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleOpenModal = (ingredient: IIngredient) => {
        dispatch({
            type: SET_MODAL_INGREDIENT,
            payload: {
                ingredient: ingredient
            }
        })
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    };

    const handleCloseModal = () => {
        dispatch({
            type: UNSET_MODAL_INGREDIENT
        })
        navigate("/", { replace: true });
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

            {modalIngredient && (
                <Modal
                    title={"Детали ингредиента"}
                    onClose={handleCloseModal}
                >
                    <IngredientDetails ingredient={modalIngredient} />
                </Modal>
            )}
        </div>
    )
}

export default FormIngredients