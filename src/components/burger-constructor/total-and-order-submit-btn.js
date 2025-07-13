import React, {useState} from "react";
import styles from "./total-and-order-submit-btn.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../modal/order-details";

const TotalAndOrderSubmitBtn = ( {total} ) => {
    const [modalOrder, setModalOrder] = useState(false)

    const handleOpenModal = () => {
        setModalOrder(true);
    };

    const handleCloseModal = () => {
        setModalOrder(false);
    };

    return (
        <div className={styles.order_wrapper}>
            <div className={styles.price_wrapper}>
                <p className="text text_type_digits-medium">
                    {total}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => handleOpenModal()}>
                Оформить заказ
            </Button>
            {modalOrder && (
                <OrderDetails handleCloseModal={handleCloseModal} />
            )}
        </div>
    )
}

export default TotalAndOrderSubmitBtn;