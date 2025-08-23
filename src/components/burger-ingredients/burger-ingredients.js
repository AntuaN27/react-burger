import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import styles from './burger-ingredients.module.css'
import TabIngredients from "./tab-ingredients";
import FormIngredients from './form-ingredients'

const BurgerIngredients = () => {
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const [currentTab, setCurrentTab] = useState('bun');
    const { ingredientsRequest, ingredientsFailed } = useSelector(
        store => store.burger_ingredients
    );

    const handleTabClick = (type) => {
        const refs = {
            bun: bunRef,
            sauce: sauceRef,
            main: mainRef,
        };
        refs[type]?.current?.scrollIntoView({behavior: 'smooth'});
    };

    // preloader
    if (ingredientsRequest) {
        return <p className="text text_type_main-large">
            Загрузка...
        </p>
    }
    if (ingredientsFailed) {
        return <p className="text text_type_main-large">
            Ошибка при загрузке данных, попробуйте обновить страницу
        </p>;
    }

    return (
        <div className={styles.burger_ingredients}>
            <p className="text text_type_main-large">Соберите бургер</p>
            <div className={styles.tab}>
                <TabIngredients
                    onTabClick={handleTabClick}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
            </div>
            <FormIngredients
                bunRef={bunRef}
                sauceRef={sauceRef}
                mainRef={mainRef}
                setCurrentTab={setCurrentTab}
            />
        </div>
    )
}

export default React.memo(BurgerIngredients);