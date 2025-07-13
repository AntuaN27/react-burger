import styles from "./ingredient-details.module.css";
import React from "react";

const IngredientDetails = ({ ingredient }) => {
    return(
        <>
            <img className={styles.modal_image} src={ingredient.image} alt={ingredient.name} />
            <p className={`${styles.modal_name_ingredient} text text_type_main-medium`}>{ingredient.name}</p>
            <div className={`${styles.modal_ingredient_description} text text_type_main-default text_color_inactive`}>
                <div className={styles.ingredient_wrapper}>
                    <p>Калории, ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </div>
                <div className={styles.ingredient_wrapper}>
                    <p>Белки,г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </div>
                <div className={styles.ingredient_wrapper}>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </div>
                <div className={styles.ingredient_wrapper}>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </>
    )
}

export default IngredientDetails;