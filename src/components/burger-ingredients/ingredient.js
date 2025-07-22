import React from 'react';
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = ({image, price, name, count, onClick, onNameClick}) => {
    return (
        <>
            {count > 0 && (
                <Counter count={count} size="default" extraClass="m-1"/>
            )}
            <img src={image} alt={name} className={styles.image_wrapper} onClick={onClick} />
            <div className={styles.price_wrapper}>
                <CurrencyIcon type="primary"/>
                <p>{price}</p>
            </div>
            <button className={styles.name} onClick={onNameClick}>{name}</button>
        </>
    )
}

export default React.memo(Ingredient);