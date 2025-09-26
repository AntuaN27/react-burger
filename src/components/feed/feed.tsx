import styles from "./feed.module.css";
import {Order} from "../order/order";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {webSocketUrl} from "../../utils/variables";
import {connectFeed, disconnectFeed} from "../../services/websocket/websocket-feed/actions";
import {getOrders, getTotal, getTotalToday} from "../../services/websocket/websocket-feed/selectors";
import {TOrder} from "../../services/types/data";

const Feed = () => {
    const dispatch = useDispatch();
    const orders = useSelector(getOrders);
    const total = useSelector(getTotal);
    const totalToday = useSelector(getTotalToday);
    const doneOrders = orders.filter((order: TOrder) => order.status === "done");
    const newOrders = orders.filter((order: TOrder) => order.status === "created");

    useEffect(() => {
        dispatch(connectFeed(`${webSocketUrl}/orders/all`))

        return () => {
            dispatch(disconnectFeed());
        };
    }, [dispatch]);

    return (
        <>
            <div className={styles.feed_page}>
                <p className={`${styles.title} text text_type_main-large`}>
                    Лента заказов
                </p>
                <div className={styles.feed_form}>
                    <div className={styles.order_feed}>
                        {orders.map((order: TOrder) => (
                            <Order orderInfo={order} key={order._id} event={"feed"} showStatus={false} />
                        ))}
                    </div>
                    <div className={styles.orders_statistics}>
                        <div className={styles.orders_status}>
                            <div className={styles.orders_status_column}>
                                <div className={`${styles.column_title} text text_type_main-medium`}>
                                    Готовы:
                                </div>
                                <div className={`${styles.column_content} ${styles.ready_status} text text_type_digits-default`}>
                                    {doneOrders.map((order: TOrder) => (
                                        <div className={styles.column_content_element} key={order._id}>
                                            {order.number}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.orders_status_column}>
                                <div className={`${styles.column_title} text text_type_main-medium`}>
                                    В работе:
                                </div>
                                <div className={`${styles.column_content} text text_type_digits-default`}>
                                    {newOrders.map((order: TOrder) => (
                                        <div className={styles.column_content_element} key={order._id}>
                                            {order.number}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.orders_done}>
                            <p className={`text text_type_main-medium`}>
                                Выполнено за всё время:
                            </p>
                            <p className={`text text_type_digits-large`}>
                                {total}
                            </p>
                        </div>
                        <div className={styles.orders_today}>
                            <p className={`text text_type_main-medium`}>
                                Выполнено за сегодня:
                            </p>
                            <p className={`text text_type_digits-large`}>
                                {totalToday}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed;