import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./total-and-order-submit-btn.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal';
import OrderDetails from "../modal/order-details";
import { UNSET_MODAL_ORDER } from "../../services/actions/currentOrder";
import { orderValidation } from "../../services/reducers/currentOrder";
import {getPrice} from "../../services/selectors/constructor";

const TotalAndOrderSubmitBtn = () => {
    const dispatch = useDispatch();
    const modalOrder = useSelector(store => store.current_order.current_order);
    const burgerIngredients = useSelector(store => store.burger_constructor.burger_ingredients);
    const burgerIngredientsIds = burgerIngredients.map(ingredient => ingredient._id);
    const total = useSelector(getPrice);

    const handleOpenModal = () => {
        dispatch(orderValidation({ burgerIngredientsIds }));
    };

    const handleCloseModal = () => {
        dispatch({
            type: UNSET_MODAL_ORDER,
        })
    };

    return (
        <div className={styles.order_wrapper}>
            <div className={styles.price_wrapper}>
                <p className="text text_type_digits-medium">
                    {total}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => handleOpenModal()}
                disabled={burgerIngredients.length === 0}
            >
                Оформить заказ
            </Button>
            {modalOrder.length > 0 && (
                <Modal
                    title={""}
                    onClose={handleCloseModal}
                >
                    <OrderDetails />
                </Modal>
            )}
        </div>
    )
}

export default TotalAndOrderSubmitBtn;