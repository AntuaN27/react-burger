import React, {useEffect, useRef, useState} from 'react';
import { useDispatch } from "react-redux";
import styles from './burger-ingredients.module.css'
import TabIngredients from "./tab-ingredients";
import FormIngredients from './form-ingredients'
import { getBurgerIngredients } from "../../services/reducers/burgerIngredients";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const [currentTab, setCurrentTab] = useState('bun');

    useEffect(() => {
        dispatch(getBurgerIngredients()); // вызов API получение ингредиентов
    }, []);

    const handleTabClick = (type) => {
        const refs = {
            bun: bunRef,
            sauce: sauceRef,
            main: mainRef,
        };
        refs[type]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

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

export default BurgerIngredients;