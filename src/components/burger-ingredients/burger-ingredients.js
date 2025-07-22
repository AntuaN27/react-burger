import React, {useRef} from 'react';
import styles from './burger-ingredients.module.css'
import TabIngredients from "./tab-ingredients";
import FormIngredients from './form-ingredients'

const BurgerIngredients = ( {data, countsIngredients, onAdd} ) => {
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

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
                <TabIngredients onTabClick={handleTabClick} />
            </div>
            <FormIngredients
                data={data}
                countsIngredients={countsIngredients}
                onAdd={onAdd}
                bunRef={bunRef}
                sauceRef={sauceRef}
                mainRef={mainRef}
            />
        </div>
    )
}

export default BurgerIngredients;