import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {getBurgerIngredients} from "../../services/reducers/burgerIngredients";
import styles from "./ingredient-page.module.css";
import IngredientDetails from "../modal/ingredient-details";

const IngredientPage = () => {
    const dispatch = useDispatch();
    // Извлечение id ингредиента из url
    const location = useLocation();
    const locationPath = location.pathname;
    const ingredientId = locationPath.split("/ingredients/")[1];
    // Получение всех ингредиентов
    const ingredients =  useSelector(store =>
        store.burger_ingredients.ingredients);
    // Получение нужного ингредиента
    const ingredient = ingredients.find(item => item._id === ingredientId);
    // Открытые в новой вкладке сбрасывает redux создавая его с нуля нужно заново запросить ингредиенты
    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(getBurgerIngredients());
        }
    }, [ingredients.length, dispatch]);
    // Возвращаем null, пока ингредиент не найден
    if (!ingredient) {
        return <p>Загрузка ингредиента...</p>;
    }
    return (
        <div className={styles.ingredient}>
            <div className={styles.title}>
                Детали ингредиента
            </div>
            <IngredientDetails ingredient={ingredient} />
        </div>
    )
}

export default IngredientPage;