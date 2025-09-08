import styles from "./form-ingredient.module.css";
import Ingredient from "./ingredient";
import React from "react";
import {IIngredient} from "../../types";

interface IIngredientsCategory {
    name: string;
    ingredients: IIngredient[];
    innerRef: React.RefObject<HTMLDivElement | null>;
    handleOpenModal: (value: IIngredient) => void;
}

export const IngredientsCategory: React.FC<IIngredientsCategory> = ({name, ingredients, innerRef, handleOpenModal}) => (
    <div className={styles.block_wrapper} ref={innerRef}>
        <h2 className="text text_type_main-medium">{name}</h2>
        <ul>
            {ingredients.map(ingredient => (
                <li key={ingredient._id} className={styles.card}>
                    <Ingredient
                        ingredient={ingredient}
                        openModal={() => handleOpenModal(ingredient)}
                    />
                </li>
            ))}
        </ul>
    </div>
)