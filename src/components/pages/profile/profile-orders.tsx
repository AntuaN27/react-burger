import styles from "./profile-page.module.css"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../../services/hooks";
import {connectProfile, disconnectProfile} from "../../../services/websocket/websocket-profile/actions";
import {getOrders} from "../../../services/websocket/websocket-profile/selectors";
import {webSocketUrl} from "../../../utils/variables";
import {Order} from "../../order/order";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken")
  const orders = useSelector(getOrders);

  useEffect(() => {
        dispatch(connectProfile(`${webSocketUrl}/orders?token=${accessToken}`))

        return () => {
            dispatch(disconnectProfile());
        };
    }, [dispatch, accessToken]);

  return (
    <div className={styles.orders_page}>
      {orders.map(order => (
          <Order key={order._id} orderInfo={order} event={"profile"} showStatus={true} />
      ))}
    </div>
  )
}

export default OrdersPage;