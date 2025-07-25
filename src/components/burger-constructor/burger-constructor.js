import React from 'react';
import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalAndOrderSubmitBtn from "./total-and-order-submit-btn";

const BurgerConstructor = ( {ingredients, onDelete} ) => {
    const total = ingredients.reduce((sum, item) => sum + item.price, 0)
    const bun = ingredients.find(ingredient => ingredient.type === "bun");
    const fillings = ingredients.filter(ingredient => ingredient.type !== "bun");

    if (ingredients.length === 0) {
        return (
            <div className={styles.burger_constructor}>
                <TotalAndOrderSubmitBtn total={0} />
            </div>
        );
    }

    return (
        <div className={styles.burger_constructor}>
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
                    <div className={styles.constructor_element_wrapper} key={index}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            handleClose={() => onDelete(ingredient._id)}
                        />
                    </div>
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
            <TotalAndOrderSubmitBtn total={total} />
        </div>
    );
}

export default BurgerConstructor;