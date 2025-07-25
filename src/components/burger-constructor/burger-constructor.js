import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './burger-constructor.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TotalAndOrderSubmitBtn from "./total-and-order-submit-btn";
import { REMOVE_CONSTRUCTOR_INGREDIENT, DECREASE_COUNTER } from "../../services/actions/burger_constructor";
import { useDrop } from "react-dnd";
import { addIngredientWithValidation } from "../../services/reducers/burger_ingredients";
import ConstructorFillingItem from "./constructor-filling-item";

const BurgerConstructor = () => {
    const ingredients = useSelector(store => store.burger_constructor.burger_ingredients);
    const dispatch = useDispatch();
    const bun = ingredients.find(ingredient => ingredient.type === "bun");
    const fillings = ingredients.filter(ingredient => ingredient.type !== "bun");
    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    })

    const onDropHandler = (ingredient) => {
        dispatch(addIngredientWithValidation(ingredient))
    }

    const removeBurgerIngredient = (ingredient) => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            ingredient_uuid: ingredient.uuid
        })
        dispatch({
            type: DECREASE_COUNTER,
            ingredient_id: ingredient._id,
        })
    }

    const moveFilling = (fromIndex, toIndex) => {
      dispatch({
        type: "MOVE_CONSTRUCTOR_INGREDIENT",
        fromIndex,
        toIndex,
      });
    };

    const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
        <div
            className={styles.burger_constructor}
            ref={el => {dropTarget(el)}}
            style={{ borderColor }}
        >
            {ingredients.length === 0 ? (
                <TotalAndOrderSubmitBtn/>
            ) : (
                <>
                    <div className={styles.burger_constructor_form}>
                    {/* Верхняя булка */}
                    {bun && (
                        <div className={styles.burger_constructor_bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}

                    {/* Начинки */}
                    <div className={styles.burger_constructor_fillings}>
                        {fillings.map((ingredient, index) => (
                            <ConstructorFillingItem
                                key={ingredient.uuid}
                                index={index}
                                ingredient={ingredient}
                                moveFilling={moveFilling}
                                onRemove={removeBurgerIngredient}
                            />
                        ))}
                    </div>

                    {/*Нижняя булка*/}
                    {bun && (
                        <div className={styles.burger_constructor_bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}
                </div>
                <TotalAndOrderSubmitBtn/>
                </>
            )}
        </div>
    );
}

export default BurgerConstructor;