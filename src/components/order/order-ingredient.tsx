import styles from "./order-ingredient.module.css";
import {IIngredient} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TIngredientProps = {
    ingredient: IIngredient,
};

export const OrderIngredient = ({ ingredient }: TIngredientProps ) => {
    return (
        <div className={styles.ingredient}>
            <div className={styles.ingredient_name}>
                <img src={ingredient.image} alt={"ingredient icon"} />
                <p className={"text text_type_main-default"}>
                    {ingredient.name}
                </p>
            </div>
            <div className={styles.ingredient_price}>
                {ingredient.type === "bun" ?
                    <p className={"text text_type_digits-default"}>{`2 x ${ingredient.price}`}</p>
                     :
                    <p className={"text text_type_digits-default"}>{`1 x ${ingredient.price}`}</p>
                }
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}