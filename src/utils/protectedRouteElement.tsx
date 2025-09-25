import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../services/hooks";
import {ReactElement, useEffect} from "react";
import {checkAuthTokens} from "../services/reducers/auth/tokens";

interface IProtectedRouteElement {
    element: ReactElement;
    onlyUnAuth?: boolean;
}

export const ProtectedRouteElement = ({element, onlyUnAuth = false}: IProtectedRouteElement) => {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refreshToken");
    // Флаг проверки прав пользователя
    // Вынесен сюда, чтобы покрывать только защищённые маршруты
    const isLoggedIn = useSelector(store => store.authTokens.isLoggedIn);
    const location = useLocation();
    const from = location.state?.from || '/';

    useEffect(() => {
        void dispatch(checkAuthTokens()); // Проверка токенов
    }, [dispatch]);

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
