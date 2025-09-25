import styles from "./order.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {SET_FEED_MODAL_ORDER, SET_PROFILE_MODAL_ORDER} from "../../services/constants/currentOrder";
import {useDispatch, useSelector} from "../../services/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {TIngredient, TOrder} from "../../services/types/data";
import {iconsWrapper} from "./icons-wrapper";
import {getOrderStatus} from "./order-status";

type OrderProps = {
  orderInfo: TOrder;
  event: "feed" | "profile";
  showStatus: boolean;
};

export const Order = ({ orderInfo, event, showStatus = false }: OrderProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const type = event === "profile" ? SET_PROFILE_MODAL_ORDER : SET_FEED_MODAL_ORDER;
    // Получение ингредиентов
    const allIngredients = useSelector(store => store.burgerIngredients.ingredients);
    const ingredients = allIngredients.filter((ingredient: TIngredient) => orderInfo.ingredients.includes(ingredient._id));
    // Получение иконок
    const ingredientsIcons = ingredients.map((ingredient: TIngredient) => ingredient.image);

    // Получение стоимости
    const orderTotalPrice = ingredients.reduce((total: number, ingredient: TIngredient) => {
        if (ingredient.type === "bun") {
            return total + ingredient.price * 2;
        }
        return total + ingredient.price;
    }, 0);

    const handleOpenModal = (orderInfo: TOrder) => {
        dispatch({
            type: type,
            payload: {
                orderInfo: {
                    ...orderInfo,
                    ingredients: ingredients,
                    price: orderTotalPrice,
                }
            }
        })
        const path = event === "profile"
        ? `/profile/orders/${orderInfo.number}`
        : `/feed/${orderInfo.number}`;

        navigate(path, { state: { background: location } });
    };

    const handleClick = () => {
        handleOpenModal(orderInfo);
    };

    return (
        <div className={styles.order} onClick={handleClick}>
            <div className={styles.title}>
                <p className={"text text_type_digits-default"}>
                    {`#${orderInfo.number}`}
                </p>
                <div className={styles.date}>
                    {
                        <FormattedDate date={new Date(orderInfo.createdAt)}/>
                    }
                </div>
            </div>
            <div className={styles.burger_name}>
                <p className={`text text_type_main-medium`}>
                    {orderInfo.name}
                </p>
                {showStatus &&
                    <p className={`text text_type_main-default ${styles.status}`}>
                        {getOrderStatus(orderInfo.status)}
                    </p>
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.footer_icons}>
                    {iconsWrapper(ingredientsIcons)}
                </div>
                <div className={styles.price}>
                    <p className={"text text_type_digits-default"}>
                        {orderTotalPrice}
                    </p>
                     <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}