import styles from "./open-order-details.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderIngredient} from "../order/order-ingredient";
import {TIngredient} from "../../services/types/data";
import {getOrderStatus} from "../order/order-status";
import {useSelector} from "../../services/hooks";

type TOpenOrdersDetailsParams = {
    event: string
};

export const OpenOrderDetails = ({event}: TOpenOrdersDetailsParams) => {
    const orderInfo = useSelector(store =>
        event === "feed" ? store.currentOrder?.openOrderFeed : store.currentOrder?.openOrderProfile
    );

    if (!orderInfo || !orderInfo.ingredients) {
      return <p>Загрузка...</p>;
    }

    return (
        <div className={styles.order_page}>
            <div className={styles.order_name}>
                <p className={"text text_type_main-medium"}>
                    {orderInfo.name}
                </p>
            </div>
            <div className={styles.order_status}>
                <p className={"text text_type_main-default"}>
                    {getOrderStatus(orderInfo.status)}
                </p>
            </div>
            <div className={styles.content_title}>
                <p className={"text text_type_main-medium"}>
                    Состав:
                </p>
            </div>
            <div className={styles.order_content}>
                {orderInfo.ingredients.map((ingredient: TIngredient, index: number) =>(
                    <OrderIngredient ingredient={ingredient} key={index} />
                ))}
            </div>
            <div className={styles.order_footer}>
                <div className={styles.order_date}>
                    {<FormattedDate date={new Date(orderInfo.createdAt)}/>}
                </div>
                <div className={styles.order_price}>
                    <p className={"text text_type_digits-default"}>
                        {orderInfo.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OpenOrderDetails;