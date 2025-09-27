import OpenOrderDetails from "../modal/open-order-details";
import {useLocation} from "react-router-dom";

const OrderPage = () => {
    const location = useLocation();
    const locationPath = location.pathname;
    let event: "feed" | "profile" = "feed";

    if (locationPath.startsWith("/profile/orders")) {
        event = "profile";
    } else if (locationPath.startsWith("/feed")) {
        event = "feed";
    }

    return (
        <OpenOrderDetails event={event} />
    )
}

export default OrderPage;