import React, {useRef, useState} from 'react';
import {useSelector} from "../../services/hooks";
import styles from './burger-ingredients.module.css'
import TabIngredients from "./tab-ingredients";
import FormIngredients from './form-ingredients'
import {TabType} from "../../types";

const BurgerIngredients = () => {
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [currentTab, setCurrentTab] = useState<TabType>('bun');
    const { ingredientsRequest, ingredientsFailed } = useSelector(
        store => store.burger_ingredients
    );

    const handleTabClick = (type: TabType) => {
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