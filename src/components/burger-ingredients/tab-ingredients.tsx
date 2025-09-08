import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-ingredients.module.css';
import {TabType} from "../../types";

interface ITabIngredients {
    onTabClick: (value: TabType) => void;
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const TabIngredients: React.FC<ITabIngredients> = ({ onTabClick, currentTab, setCurrentTab }) => {
    const handleClick = (value: TabType) => {
        setCurrentTab(value);
        onTabClick(value);
    }

    return (
        <div className={styles.tab_ingredients}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={() => handleClick("bun")}>
                Булки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => handleClick("sauce")}>
                Соусы
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={() => handleClick("main")}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabIngredients;