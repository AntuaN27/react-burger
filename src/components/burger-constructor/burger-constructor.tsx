import React from 'react';
import { useSelector, useDispatch } from "../../services/hooks";
import styles from './burger-constructor.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TotalAndOrderSubmitBtn from "./total-and-order-submit-btn";
import { REMOVE_CONSTRUCTOR_INGREDIENT, MOVE_CONSTRUCTOR_INGREDIENT } from "../../services/constants/burgerСonstructor";
import { useDrop } from "react-dnd";
import { addIngredientWithValidation } from "../../services/reducers/burgerIngredients";
import ConstructorFillingItem from "./constructor-filling-item";
import {IIngredient} from "../../types";
import {TIngredient} from "../../services/types/data";

const BurgerConstructor = () => {
    const ingredients = useSelector(store => store.burgerConstructor.burger_ingredients);
    const dispatch = useDispatch();
    const bun = ingredients.find((ingredient: TIngredient) => ingredient.type === "bun");
    const fillings = ingredients.filter((ingredient: TIngredient) => ingredient.type !== "bun");
    const orderRequest = useSelector(store => store.currentOrder.postOrderRequest);

    const [{ isHover }, dropTarget] = useDrop<IIngredient, void, { isHover: boolean }>({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    })

    const onDropHandler = (ingredient: IIngredient) => {
        dispatch(addIngredientWithValidation(ingredient))
    }

    const removeBurgerIngredient = (ingredient: IIngredient) => {
        if (ingredient.uuid) {
            dispatch({
                type: REMOVE_CONSTRUCTOR_INGREDIENT,
                payload: {
                    ingredient_uuid: ingredient.uuid
                }
            })
        }
    }

    const moveFilling = (fromIndex: number, toIndex: number) => {
      dispatch({
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        payload: {
            fromIndex,
            toIndex,
        }
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
                        {fillings.map((ingredient: IIngredient, index: number) => (
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
                {orderRequest && (
                    <p className={styles.preloader_order}>
                        Пожалуйста подождите, оформляем заказ...
                    </p>
                )}
                </>
            )}
        </div>
    );
}

export default React.memo(BurgerConstructor);