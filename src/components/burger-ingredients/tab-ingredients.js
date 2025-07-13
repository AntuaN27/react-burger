import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-ingredients.module.css';

const TabIngredients = ( {onTabClick} ) => {
    const [current, setCurrent] = React.useState('bun')

    const handleClick = (value) => {
        setCurrent(value);
        onTabClick(value);
    }

    return (
        <div className={styles.tab_ingredients}>
            <Tab value="bun" active={current === 'bun'} onClick={() => handleClick("bun")}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => handleClick("sauce")}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => handleClick("main")}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabIngredients;