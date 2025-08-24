import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRouteElement = ({element, onlyUnAuth = false}) => {
    const refreshToken = localStorage.getItem("refreshToken");
    // Флаг проверки прав пользователя
    // Вынесен сюда, чтобы покрывать только защищённые маршруты
    const isLoggedIn = useSelector(store => store.authTokens.isLoggedIn);
    const location = useLocation();
    const from = location.state?.from || '/';

    // Юзер авторизован, но заходит на страницы с авторизацией (наличие refreshToken доп для корректной работы)
    if (onlyUnAuth && isLoggedIn && refreshToken) {
        return <Navigate to={ from } replace/>;
    }
    // Юзер не авторизован, но переходит на защищённый маршрут
    if (!onlyUnAuth && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }
    return element;
};
