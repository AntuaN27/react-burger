import React, {useState} from 'react';
import styles from './form-ingredient.module.css';
import Ingredient from "./ingredient";
import IngredientDetails from "../modal/ingredient-details";
import Modal from '../modal/modal';

const FormIngredients = ( {data, countsIngredients, onAdd, bunRef, sauceRef, mainRef} ) => {
    const [modalIngredient, setModalIngredient] = useState(null);

    const handleOpenModal = (ingredient) => {
        setModalIngredient(ingredient);
    };

    const handleCloseModal = () => {
        setModalIngredient(null);
    };

    const buns = data.filter(ingredient => ingredient.type === "bun");
    const sauce = data.filter(ingredient => ingredient.type === "sauce");
    const main = data.filter(ingredient => ingredient.type === "main");

    const BlockWrapper = ({name, data, innerRef}) => (
        <div className={styles.block_wrapper} ref={innerRef}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <ul>
                {data.map(ingredient => (
                <li key={ingredient._id} className={styles.card}>
                    <Ingredient
                        image={ingredient.image}
                        price={ingredient.price}
                        name={ingredient.name}
                        count={countsIngredients[ingredient._id] || 0}
                        onClick={() => onAdd(ingredient)}
                        onNameClick={() => handleOpenModal(ingredient)}
                    />
                </li>
            ))}
            </ul>
        </div>
    )

    return (
        <div className={styles.form}>
            <BlockWrapper name={"Булки"} data={buns} innerRef={bunRef} />
            <BlockWrapper name={"Соусы"} data={sauce} innerRef={sauceRef} />
            <BlockWrapper name={"Начинки"} data={main} innerRef={mainRef} />

            {modalIngredient && (
                <Modal
                    title={"Детали ингредиента"}
                    onClose={handleCloseModal}
                >
                    <IngredientDetails ingredient={modalIngredient} />
                </Modal>
            )}
        </div>
    )
}

export default FormIngredients