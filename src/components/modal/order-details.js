import React from "react";
import styles from './order-details.module.css';
import orderIcon from '../../images/modal_order_icon.svg';

const OrderDetails = () => {
    return (
        <div className={styles.order_details}>
            <p className={`${styles.order_number} text text_type_digits-large`}>123456</p>
            <p className={`${styles.order_identifier} text text_type_main-medium`}>идентификатор заказа</p>
            <img src={orderIcon} alt={"modal_order_icon"} className={styles.order_icon}/>
            <p className={`${styles.order_status} text text_type_main-small`}>Ваш заказ начали готовить</p>
            <p
                className={`${styles.order_description} text text_type_main-default text_color_inactive`}
            >
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

export default OrderDetails;